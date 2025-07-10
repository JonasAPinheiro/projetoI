import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";
import { CursoEntity } from "../model/entity/CursoEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";

export class CatalogoService {
  private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
  private categoriaLivroRepository = CategoriaLivroRepository.getInstance();
  private cursoRepository = CursoRepository.getInstance();

  async listarCategoriasUsuarios(): Promise<CategoriaUsuarioEntity[]> {
    return await this.categoriaUsuarioRepository.exibirCategoriasUsuarios();
  }

  async listarCategoriasLivros(): Promise<CategoriaLivroEntity[]> {
    return await this.categoriaLivroRepository.exibirCategoriasLivros();
  }

  async listarCursos(): Promise<CursoEntity[]> {
    return await this.cursoRepository.exibirCursos();
  }
}
