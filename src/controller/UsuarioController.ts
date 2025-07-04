import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await this.usuarioService.exibeUsuarios();
      res.status(200).json(usuarios);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os usuários!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async listarUsuarioPorCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const usuario = await this.usuarioService.exibeUsuarioPorCpf(cpf);
      res.status(200).json(usuario);
    } catch (err: unknown) {
      let message = "Não foi possível encontrar usuário com esse CPF!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async cadastrarUsuario(req: Request, res: Response) {
    try {
      const usuario = await this.usuarioService.novoUsuario(req.body);
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!!!",
        usuario: usuario,
      });
    } catch (err: unknown) {
      let message = "Não foi possível cadastrar usuário!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async atualizarUsuario(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const usuario = await this.usuarioService.atualizaUsuario(cpf, req.body);
      res.status(200).json({
        message: "Usuário atualizado com sucesso!!!",
        usuario: usuario,
      });
    } catch (err: unknown) {
      let message = "Não foi possível atualizar usuário!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async removerUsuario(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const usuario = await this.usuarioService.exibeUsuarioPorCpf(cpf);
      await this.usuarioService.removeUsuario(cpf);
      res.status(200).json({
        message: "Usuário removido com sucesso!!!",
        usuario: usuario,
      });
    } catch (err: unknown) {
      let message = "Não foi possível excluir usuário!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
