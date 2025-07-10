import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CatalogoService } from "../service/CatalogoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";
import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CursoEntity } from "../model/entity/CursoEntity";

@Route("catalogos")
@Tags("catalogos")
export class CatalogoController extends Controller {
  private catalogoService = new CatalogoService();

  @Get("categorias-usuario")
  async listarCategoriasUsuario(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const categorias: CategoriaUsuarioEntity[] = await this.catalogoService.listarCategoriasUsuarios();
      return sucess(200, new BasicResponseDto("Categorias de Usuários listadas com sucesso!", categorias));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("categorias-livro")
  async listarCategoriasLivro(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const categorias: CategoriaLivroEntity[] = await this.catalogoService.listarCategoriasLivros();
      return sucess(200, new BasicResponseDto("Categorias de Livros listadas com sucesso!", categorias));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("cursos")
  async listarCursos(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const cursos: CursoEntity[] = await this.catalogoService.listarCursos();
      return sucess(200, new BasicResponseDto("Cursos listados com sucesso!", cursos));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
