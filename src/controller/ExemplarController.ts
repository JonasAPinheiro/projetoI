import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ExemplarService } from "../service/ExemplarService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ExemplarEntity } from "../model/entity/ExemplarEntity";
import { ExemplarRequestDto } from "../model/dto/exemplar/ExemplarRequestDto";
import { ExemplarUpdateDto } from "../model/dto/exemplar/ExemplarUpdateDto";

@Route("estoque")
@Tags("estoque")
export class ExemplarController extends Controller {
  private exemplarService = new ExemplarService();

  @Get()
  async listarExemplares(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const exemplares: ExemplarEntity[] = await this.exemplarService.exibeExemplares();
      return sucess(200, new BasicResponseDto("Exemplares listados com sucesso!", exemplares));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("{codigo}")
  async listarExemplarPorCodigo(
    @Path() codigo: number,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const exemplar: ExemplarEntity = await this.exemplarService.exibeExemplarPorCodigo(codigo);
      return sucess(200, new BasicResponseDto("Exemplar encontrado!", exemplar));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Post()
  async cadastrarExemplar(
    @Body() dto: ExemplarRequestDto,
    @Res() sucess: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const exemplar = await this.exemplarService.novoExemplar(dto);
      return sucess(201, new BasicResponseDto("Exemplar criado com sucesso!", exemplar));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{codigo}")
  async atualizarExemplar(
    @Path() codigo: number,
    @Body() dto: ExemplarUpdateDto,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const exemplar = await this.exemplarService.atualizaExemplar(codigo, dto);
      return sucess(200, new BasicResponseDto("Exemplar atualizado com sucesso!", exemplar));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{codigo}")
  async removerExemplar(
    @Path() codigo: number,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const exemplar = await this.exemplarService.exibeExemplarPorCodigo(codigo);
      await this.exemplarService.removeExemplar(codigo);
      return sucess(200, new BasicResponseDto("Exemplar removido com sucesso!", exemplar));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
