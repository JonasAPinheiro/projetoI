import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LivroService } from "../service/LivroService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRequestDto } from "../model/dto/livro/LivroRequestDto";
import { LivroUpdateDto } from "../model/dto/livro/LivroUpdateDto";

@Route("livros")
@Tags("livros")
export class LivroController extends Controller {
  private livroService = new LivroService();

  @Get()
  async listarLivros(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const livros: LivroEntity[] = await this.livroService.exibeLivros();
      return sucess(200, new BasicResponseDto("Livros listados com sucesso!", livros));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("{isbn}")
  async listarLivroPorIsbn(
    @Path() isbn: string,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const livro: LivroEntity = await this.livroService.exibeLivroPorIsbn(isbn);
      return sucess(200, new BasicResponseDto("Livro encontrado!", livro));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Post()
  async cadastrarLivro(
    @Body() dto: LivroRequestDto,
    @Res() sucess: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const livro = await this.livroService.novoLivro(dto);
      return sucess(201, new BasicResponseDto("Livro criado com sucesso!", livro));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{isbn}")
  async atualizarLivro(
    @Path() isbn: string,
    @Body() dto: LivroUpdateDto,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const livro = await this.livroService.atualizaLivro(isbn, dto);
      return sucess(200, new BasicResponseDto("Livro atualizado com sucesso!", livro));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{isbn}")
  async removerLivro(
    @Path() isbn: string,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const livro = await this.livroService.exibeLivroPorIsbn(isbn);
      await this.livroService.removeLivro(isbn);
      return sucess(200, new BasicResponseDto("Livro removido com sucesso!", livro));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
