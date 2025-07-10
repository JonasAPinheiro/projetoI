import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRequestDto } from "../model/dto/emprestimo/EmprestimoRequestDto";
import { EmprestimoUpdateDto } from "../model/dto/emprestimo/EmprestimoUpdateDto";

@Route("emprestimos")
@Tags("emprestimos")
export class EmprestimoController extends Controller {
  private emprestimoService = new EmprestimoService();

  @Get()
  async listarEmprestimos(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimos: EmprestimoEntity[] = await this.emprestimoService.exibeEmprestimos();
      return sucess(200, new BasicResponseDto("Empréstimos listados com sucesso!", emprestimos));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Post()
  async cadastrarEmprestimo(
    @Body() dto: EmprestimoRequestDto,
    @Res() sucess: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.novoEmprestimo(dto);
      return sucess(201, new BasicResponseDto("Empréstimo criado com sucesso!", emprestimo));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{id}/devolucao")
  async registrarDevolucao(
    @Path() id: number,
    @Body() dto: EmprestimoUpdateDto,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.registraDevolucao(id, dto);
      return sucess(200, new BasicResponseDto("Empréstimo atualizado com sucesso!", emprestimo));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
