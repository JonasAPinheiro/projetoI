import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { ExemplarRepository } from "../repository/ExemplarRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CatalogoService } from "./CatalogoService";

export class EmprestimoService {
  private emprestimoRepository = EmprestimoRepository.getInstance();
  private usuarioRepository = UsuarioRepository.getInstance();
  private exemplarRepository = ExemplarRepository.getInstance();
  private livroRepository = LivroRepository.getInstance();
  private catalogoService = new CatalogoService();

  async exibeEmprestimos(): Promise<EmprestimoEntity[]> {
    return this.emprestimoRepository.exibirEmprestimos();
  }

  async novoEmprestimo(data: any): Promise<EmprestimoEntity> {
    if (!data.usuarioId || !data.exemplarId || !data.dataEmprestimo) {
      throw new Error("Preencha todos os campos!!!");
    }

    const usuario = await this.usuarioRepository.exibirUsuarioPorId(data.usuarioId);
    if (!usuario) {
      throw new Error("Usuário não existe!!!");
    }

    if (usuario.ativo !== "ativo") {
      throw new Error("Usuário inativo, não é possível realizar o empréstimo!!!");
    }

    const exemplar = await this.exemplarRepository.exibirExemplarPorId(data.exemplarId);
    if (!exemplar) {
      throw new Error("Exemplar não existe!!!");
    }

    if (exemplar.quantidade <= exemplar.quantidadeEmprestada) {
      throw new Error("Exemplar não está disponível para empréstimo!!!");
    }

    const livro = await this.livroRepository.exibirLivroPorId(exemplar.livroId);
    if (!livro) throw new Error("Livro não encontrado!!!");

    const { limiteLivros, prazoDias } = await this.obterLimitesEmprestimo(
      usuario.categoriaId,
      usuario.cursoId,
      livro.categoriaId
    );

    const emprestimos = await this.emprestimoRepository.exibirEmprestimos();
    const emprestimosPendentes = emprestimos.filter((e) => e.usuarioId === data.usuarioId && !e.dataEntrega);

    if (emprestimosPendentes.length >= limiteLivros) {
      throw new Error("Usuário atingiu o limite de empréstimos permitidos!!!");
    }

    const dataEmprestimo = new Date(data.dataEmprestimo);
    const dataDevolucao = new Date(dataEmprestimo.getTime() + prazoDias * 86400000);

    const emprestimo = new EmprestimoEntity(
      undefined,
      data.usuarioId,
      data.exemplarId,
      data.dataEmprestimo,
      dataDevolucao,
      null,
      0,
      null
    );

    exemplar.quantidadeEmprestada++;
    exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
    await this.exemplarRepository.atualizaExemplar(exemplar.codigo, exemplar);

    return await this.emprestimoRepository.insereEmprestimo(emprestimo);
  }

  async registraDevolucao(id: number, data: any): Promise<EmprestimoEntity> {
    const emprestimo = await this.emprestimoRepository.exibirEmprestimoPorId(id);

    if (emprestimo.dataEntrega) {
      throw new Error("Este empréstimo já foi devolvido!!!");
    }

    emprestimo.dataEntrega = new Date(data.dataEntrega);

    const diasAtraso = await this.calcularAtraso(emprestimo);
    await this.aplicarSuspensao(emprestimo, diasAtraso);

    const exemplar = await this.exemplarRepository.exibirExemplarPorId(emprestimo.exemplarId);
    if (exemplar) {
      exemplar.quantidadeEmprestada--;
      exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
      await this.exemplarRepository.atualizaExemplar(exemplar.codigo, exemplar);
    }

    return await this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo);
  }

  async verificarAtrasosPendentes(): Promise<void> {
    const emprestimos = await this.emprestimoRepository.exibirEmprestimos();
    const diaAtual = new Date();

    const emprestimosAtrasados = emprestimos.filter((e) => {
      return !e.dataEntrega && new Date(e.dataDevolucao) < diaAtual;
    });

    for (const emprestimo of emprestimosAtrasados) {
      const diasAtraso = Math.max(
        Math.ceil((diaAtual.getTime() - new Date(emprestimo.dataDevolucao).getTime()) / (1000 * 60 * 60 * 24)),
        0
      );

      await this.aplicarSuspensao(emprestimo, diasAtraso, diaAtual);
      await this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo);
    }
  }

  private async calcularAtraso(emprestimo: EmprestimoEntity): Promise<number> {
    const devolucao = new Date(emprestimo.dataDevolucao);
    const entrega = emprestimo.dataEntrega;
    if (!entrega) {
      throw new Error("Data de entrega inválida!!!");
    }

    const atrasoMs = entrega.getTime() - devolucao.getTime();
    const diasAtraso = Math.max(Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)), 0);
    emprestimo.diasAtraso = diasAtraso;
    return diasAtraso;
  }

  private async aplicarSuspensao(emprestimo: EmprestimoEntity, diasAtraso: number, dataBase?: Date): Promise<void> {
    if (diasAtraso > 0) {
      const base = dataBase ?? emprestimo.dataEntrega;
      if (!base) {
        throw new Error("Data de base para suspensão inválida!");
      }

      const suspensaoDias = diasAtraso * 3;
      const suspensao = new Date(base.getTime() + suspensaoDias * 86400000);
      emprestimo.suspensaoAte = suspensao;

      const usuario = await this.usuarioRepository.exibirUsuarioPorId(emprestimo.usuarioId);
      if (usuario) {
        if (suspensaoDias > 60) {
          usuario.ativo = "suspenso";
        } else {
          const emprestimos = await this.emprestimoRepository.exibirEmprestimos();
          const ativos = emprestimos.filter(
            (e) => e.usuarioId === usuario.id && e.suspensaoAte && new Date(e.suspensaoAte) > new Date()
          );

          if (ativos.length > 2) {
            usuario.ativo = "inativo";
          }
        }

        await this.usuarioRepository.atualizaUsuario(usuario.cpf, usuario);
      }
    }
  }

  private async obterLimitesEmprestimo(
    categoriaId: number,
    cursoId: number,
    livroCategoriaId: number
  ): Promise<{ limiteLivros: number; prazoDias: number }> {
    const categorias = await this.catalogoService.listarCategoriasUsuarios();
    const categoria = categorias.find((c) => c.id === categoriaId);
    if (!categoria) {
      throw new Error("Categoria de usuário não permite empréstimos!!!");
    }

    switch (categoria.nome) {
      case "Professor":
        return { limiteLivros: 5, prazoDias: 40 };
      case "Aluno":
        const livroArea = cursoId == livroCategoriaId;
        return {
          limiteLivros: 3,
          prazoDias: livroArea ? 30 : 15,
        };
      default:
        throw new Error("Nao foi possivel emprestar!!!");
    }
  }
}
