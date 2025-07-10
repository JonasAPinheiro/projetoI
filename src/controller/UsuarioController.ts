import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRequestDto } from "../model/dto/usuario/UsuarioRequestDto";
import { UsuarioUpdateDto } from "../model/dto/usuario/UsuarioUpdateDto";

@Route("usuarios")
@Tags("usuarios")
export class UsuarioController extends Controller {
  private usuarioService = new UsuarioService();

  @Get()
  async listarUsuarios(
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuarios: UsuarioEntity[] = await this.usuarioService.exibeUsuarios();
      return sucess(200, new BasicResponseDto("Usuários listados com sucesso!", usuarios));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Get("{cpf}")
  async listarUsuarioPorCpf(
    @Path() cpf: string,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuario: UsuarioEntity = await this.usuarioService.exibeUsuarioPorCpf(cpf);
      return sucess(200, new BasicResponseDto("Usuário encontrado!", usuario));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Post()
  async cadastrarUsuario(
    @Body() dto: UsuarioRequestDto,
    @Res() sucess: TsoaResponse<201, BasicResponseDto>,
    @Res() fail: TsoaResponse<400, BasicResponseDto>
  ): Promise<void> {
    try {
      const usuario = await this.usuarioService.novoUsuario(dto);
      return sucess(201, new BasicResponseDto("Usuário criado com sucesso!", usuario));
    } catch (error: any) {
      return fail(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Put("{cpf}")
  async atualizarUsuario(
    @Path() cpf: string,
    @Body() dto: UsuarioUpdateDto,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const usuario = await this.usuarioService.atualizaUsuario(cpf, dto);
      return sucess(200, new BasicResponseDto("Usuário atualizado com sucesso!", usuario));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }

  @Delete("{cpf}")
  async removerUsuario(
    @Path() cpf: string,
    @Res() sucess: TsoaResponse<200, BasicResponseDto>,
    @Res() notFound: TsoaResponse<400, BasicResponseDto>
  ) {
    try {
      const usuario = await this.usuarioService.exibeUsuarioPorCpf(cpf);
      await this.usuarioService.removeUsuario(cpf);
      return sucess(200, new BasicResponseDto("Usuário removido com sucesso!", usuario));
    } catch (error: any) {
      return notFound(400, new BasicResponseDto(error.message, undefined));
    }
  }
}
