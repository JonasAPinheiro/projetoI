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

  exibeEmprestimos(): EmprestimoEntity[] {
    return this.emprestimoRepository.exibirEmprestimos();
  }

  async novoEmprestimo(data: any): Promise<EmprestimoEntity> {
    const usuario =  await this.usuarioRepository.exibirUsuarioPorId(data.usuarioId);
    if (!usuario){
      throw new Error("Usuário não existe!!!");
    }

    if (usuario.ativo !== "ativo") {
      throw new Error("Usuário inativo, não é possível realizar o empréstimo!!!");
    }

    if (!data.usuarioId || !data.exemplarId || !data.dataEmprestimo) {
      throw new Error("Preencha todos os campos!!!");
    }

    const exemplar = this.exemplarRepository.exibirExemplarPorCodigo(data.exemplarId);
    if (!exemplar){
      throw new Error("Exemplar não existe!!!");
    }
    
    if (exemplar.quantidade <= exemplar.quantidadeEmprestada) {
      throw new Error("Exemplar não está disponível para empréstimo!!!");
    }

    const livro = this.livroRepository.exibirLivroPorId(exemplar.livroId);
    if (!livro) throw new Error("Livro não encontrado!!!");

    const { limiteLivros, prazoDias } = await this.obterLimitesEmprestimo(usuario.categoriaId, usuario.cursoId, livro.categoriaId);

    const emprestimosPendentes = this.emprestimoRepository.exibirEmprestimos().filter(e => e.usuarioId === data.usuarioId && !e.dataEntrega);

    if (emprestimosPendentes.length >= limiteLivros) {
      throw new Error("Usuário atingiu o limite de empréstimos permitidos!!!");
    }

    const dataEmprestimo = new Date(data.dataEmprestimo);
    const dataDevolucao = new Date(dataEmprestimo.getTime() + prazoDias * 86400000);

    const emprestimo = new EmprestimoEntity(undefined, data.usuarioId, data.exemplarId, data.dataEmprestimo, dataDevolucao, null, 0, null);

    this.emprestimoRepository.insereEmprestimo(emprestimo);

    exemplar.quantidadeEmprestada++;
    exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
    this.exemplarRepository.atualizaExemplar(data.exemplarId, exemplar);

    return emprestimo;
  }

  registraDevolucao(id: number, data: any): EmprestimoEntity {
    const emprestimo = this.emprestimoRepository.exibirEmprestimoPorId(id);

    if (emprestimo.dataEntrega) {
      throw new Error("Este empréstimo já foi devolvido!!!");
    }

    emprestimo.dataEntrega = new Date(data.dataEntrega);

    const diasAtraso = this.calcularAtraso(emprestimo);
    this.aplicarSuspensao(emprestimo, diasAtraso);

    this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo);

    const exemplar = this.exemplarRepository.exibirExemplarPorCodigo(emprestimo.exemplarId);
    if (exemplar) {
      exemplar.quantidadeEmprestada--;
      exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
      this.exemplarRepository.atualizaExemplar(emprestimo.exemplarId, exemplar);
    }

    return emprestimo;
  }

  private calcularAtraso(emprestimo: EmprestimoEntity): number {
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

  private async aplicarSuspensao(emprestimo: EmprestimoEntity, diasAtraso: number) {
    if (diasAtraso > 0) {
      const entrega = emprestimo.dataEntrega;
      if (!entrega) {
        throw new Error("Data de entrega inválida!!!");
      }

      const suspensaoDias = diasAtraso * 3;
      const suspensao = new Date(entrega.getTime() + suspensaoDias * 86400000);

      emprestimo.suspensaoAte = suspensao;

      const usuario = await this.usuarioRepository.exibirUsuarioPorId(emprestimo.usuarioId);
      if (usuario) {
        if (suspensaoDias > 60) {
          usuario.ativo = "suspenso";
        } else {
          const emprestimosUsuario = this.emprestimoRepository.exibirEmprestimos().filter((e) => e.usuarioId == usuario.id && e.suspensaoAte && new Date(e.suspensaoAte) > new Date());

          if (emprestimosUsuario.length > 2) {
            usuario.ativo = "inativo";
          }
        }
        this.usuarioRepository.atualizaUsuario(usuario.cpf, usuario);
      }
    }
  }

  private async obterLimitesEmprestimo(categoriaId: number, cursoId: number, livroCategoriaId: number): Promise<{ limiteLivros: number, prazoDias: number }> {
    const categorias = await this.catalogoService.listarCategoriasUsuarios()
    const categoria = categorias.find(c => c.id === categoriaId);
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
          prazoDias: livroArea ? 30 : 15
        };
      default:
        throw new Error("Nao foi possivel emprestar!!!");
    }
  }
}