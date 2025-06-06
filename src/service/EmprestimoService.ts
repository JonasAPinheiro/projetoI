import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService {
  private emprestimoRepository = EmprestimoRepository.getInstance();
  private usuarioRepository = UsuarioRepository.getInstance();

  exibeEmprestimos(): EmprestimoEntity[] {
    return this.emprestimoRepository.exibirEmprestimos();
  }

  novoEmprestimo(data: any): EmprestimoEntity {
    const usuario =  this.usuarioRepository.buscarUsuarioPorId(data.usuarioId);
    if(!usuario){
      throw new Error("Usuário não existe!!!");
    }else{
      if (usuario.ativo != true) {
        throw new Error("Usuário inativo, não é possível realizar o empréstimo!!!");
      }
    }
    
    if (!data.usuarioId || !data.exemplarId || !data.dataEmprestimo || !data.dataDevolucao) {
      throw new Error("Preencha todos os campos!!!");
    }

    const emprestimo = new EmprestimoEntity(undefined, data.usuarioId, data.exemplarId, data.dataEmprestimo, data.dataDevolucao, null, 0, null);

    this.emprestimoRepository.insereEmprestimo(emprestimo);
    return emprestimo;
  }

  registraDevolucao(id: number, data: any): EmprestimoEntity {
    const emprestimo = this.emprestimoRepository.exibirEmprestimoPorId(id);

    if (emprestimo.dataEntrega) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    emprestimo.dataEntrega = new Date(data.dataEntrega);

    const devolucao = new Date(emprestimo.dataDevolucao);
    const entrega = emprestimo.dataEntrega;

    const atrasoMs = entrega.getTime() - devolucao.getTime();
    const diasAtraso = Math.max(Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)), 0);
    emprestimo.diasAtraso = diasAtraso;

    if (diasAtraso > 0) {
      const suspensaoDias = diasAtraso * 3;
      const suspensao = new Date(entrega.getTime() + suspensaoDias * 86400000);

      emprestimo.suspensaoAte = suspensao;

      if (suspensaoDias > 60) {
        const usuario = this.usuarioRepository.buscarUsuarioPorId(emprestimo.usuarioId);
        if (usuario) {
          usuario.ativo = false;
          this.usuarioRepository.atualizaUsuario(usuario.cpf, usuario);
        }
      }
    }
    this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo);

    return emprestimo;
  }
}