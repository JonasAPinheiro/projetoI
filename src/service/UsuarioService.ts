import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
  private usuarioRepository = UsuarioRepository.getInstance();

  exibeUsuarios(): UsuarioEntity[]{
    return this.usuarioRepository.exibirUsuarios();
  }

  exibeUsuarioPorCpf(cpf: string): UsuarioEntity{
    return this.usuarioRepository.exibirUsuarioPorCpf(cpf);
  }

  novoUsuario(data: any): UsuarioEntity {
    if (!data.nome ||!data.cpf || data.ativo == undefined ||!data.categoriaId || !data.cursoId
    ) {
      throw new Error("Preencha todos os campos!!!");
    }

    const usuario = new UsuarioEntity(undefined, data.nome, data.cpf, data.ativo, data.categoriaId, data.cursoId
    );
    this.usuarioRepository.insereUsuario(usuario);

    return usuario;
  }

  atualizaUsuario(cpf:string, data: any): UsuarioEntity{
    if (!data.nome ||!data.cpf || data.ativo == undefined ||!data.categoriaId || !data.cursoId
    ) {
      throw new Error("Preencha todos os campos!!!");
    }

    const usuarioAtual = this.usuarioRepository.exibirUsuarioPorCpf(cpf);

    const novoUsuario = new UsuarioEntity(usuarioAtual.id ,data.nome, usuarioAtual.cpf, data.ativo, data.categoriaId, data.cursoId);
    this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);

    return novoUsuario;
  }

  removeUsuario(cpf: string){
    this.usuarioRepository.removeUsuario(cpf);
  }
}
