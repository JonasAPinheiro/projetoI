import { UsuarioEntity } from "../model/UsuarioEntity";
import { categoriasUsuario } from "../repository/CategoriaUsuarioRepository";
import { cursos } from "../repository/CursoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
  private usuarioRepository = UsuarioRepository.getInstance();

  async exibeUsuarios(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.exibirUsuarios();
  }

  async exibeUsuarioPorCpf(cpf: string): Promise<UsuarioEntity> {
    return await this.usuarioRepository.exibirUsuarioPorCpf(cpf);
  }

  async novoUsuario(data: any): Promise<UsuarioEntity> {
    if (!data.nome || !data.email || !data.cpf || !data.categoriaId || !data.cursoId) {
      throw new Error("Preencha todos os campos!!!");
    }

    this.validarCategoria(data.categoriaId);
    this.validarCurso(data.cursoId);

    const usuario = new UsuarioEntity(
      undefined,
      data.nome,
      data.email,
      data.cpf,
      "ativo",
      data.categoriaId,
      data.cursoId
    );

    return await this.usuarioRepository.insereUsuario(usuario);
  }

  async atualizaUsuario(cpf: string, data: any): Promise<UsuarioEntity> {
    const usuarioAtual = await this.usuarioRepository.exibirUsuarioPorCpf(cpf);
    if (!data.nome || data.ativo == undefined || !data.categoriaId || !data.cursoId) {
      throw new Error("Preencha todos os campos!!!");
    }

    if (data.cpf && data.cpf != usuarioAtual.cpf) {
      throw new Error("Não é permitido alterar o CPF!!!");
    }

    this.validarCategoria(data.categoriaId);
    this.validarCurso(data.cursoId);

    const novoUsuario = new UsuarioEntity(
      usuarioAtual.id,
      data.nome,
      data.email,
      usuarioAtual.cpf,
      data.ativo,
      data.categoriaId,
      data.cursoId
    );
    return await this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);
  }

  async removeUsuario(cpf: string): Promise<UsuarioEntity> {
    return await this.usuarioRepository.removeUsuario(cpf);
  }

  private validarCategoria(id: any): void {
    if (!categoriasUsuario.find((categoria) => categoria.id === id)) {
      throw new Error("Categoria não existe!!!");
    }
  }

  private validarCurso(id: any): void {
    if (!cursos.find((curso) => curso.id === id)) {
      throw new Error("Curso não existe!!!");
    }
  }
}
