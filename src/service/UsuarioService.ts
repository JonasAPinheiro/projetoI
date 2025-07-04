import { UsuarioEntity } from "../model/UsuarioEntity";
import { categoriasUsuario } from "../repository/CategoriaUsuarioRepository";
import { cursos } from "../repository/CursoRepository";
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
    if (!data.nome || !data.email ||!data.cpf || !data.categoriaId || !data.cursoId
    ) {
      throw new Error("Preencha todos os campos!!!");
    }

    if (this.usuarioRepository.buscarUsuarioPorCpf(data.cpf)) {
      throw new Error("Cpf já cadastrado em outro usuário!!!");
    }

    this.validarCategoria(data.categoriaId);
    this.validarCurso(data.cursoId);

    const usuario = new UsuarioEntity(undefined, data.nome, data.email, data.cpf, "ativo", data.categoriaId, data.cursoId
    );
    this.usuarioRepository.insereUsuario(usuario);

    return usuario;
  }

  atualizaUsuario(cpf:string, data: any): UsuarioEntity{
    const usuarioAtual = this.usuarioRepository.exibirUsuarioPorCpf(cpf);
    if (!data.nome || data.ativo == undefined || !data.categoriaId || !data.cursoId) 
    {
      throw new Error("Preencha todos os campos!!!");
    }

    if (data.cpf != usuarioAtual.cpf) {
      throw new Error("Não é permitido alterar o CPF!!!");
    }

    this.validarCategoria(data.categoriaId);
    this.validarCurso(data.cursoId);

    const novoUsuario = new UsuarioEntity(usuarioAtual.id ,data.nome, data.email, usuarioAtual.cpf, data.ativo, data.categoriaId, data.cursoId);
    this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);

    return novoUsuario;
  }

  removeUsuario(cpf: string){
    this.usuarioRepository.removeUsuario(cpf);
  }  

  private validarCategoria(id: any): void {
    if (!categoriasUsuario.find(categoria => categoria.id === id)) 
    {
      throw new Error("Categoria não existe!!!");
    }
  }

  private validarCurso(id: any): void {
    if (!cursos.find(curso => curso.id === id)) 
    {
      throw new Error("Curso não existe!!!");
    }
  }
}
