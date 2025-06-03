import { categoriasLivro } from "../repository/CategoriaLivroRepository";
import { categoriasUsuario } from "../repository/CategoriaUsuarioRepository";
import { cursos } from "../repository/CursoRepository";

export class CatalogoService{
  listarCategoriasUsuarios(){
    return categoriasUsuario;
  }

  listarCategoriasLivros(){
    return categoriasLivro;
  }

  listarCursos(){
    return cursos;
  }
}