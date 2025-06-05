import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {
  private usuarioService = new UsuarioService();

  listarUsuarios(req: Request, res: Response): void {
    try {
      const usuarios = this.usuarioService.exibeUsuarios();
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

  listarUsuarioPorCpf(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;
      const usuario = this.usuarioService.exibeUsuarioPorCpf(cpf);
      res.status(200).json(usuario);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar usuário com esse CPF!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  cadastrarUsuario(req: Request, res: Response): void {
    try {
      const usuario = this.usuarioService.novoUsuario(req.body);
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!!!",
        usuario: usuario,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar usuário!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  atualizarUsuario(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;
      const usuario = this.usuarioService.atualizaUsuario(cpf, req.body);
      res.status(200).json({
        message: "Usuário atualizado com sucesso!!!",
        usuario: usuario
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar usuário!!!"
      if(error instanceof Error){
        message = error.message;
      }
      res.status(400).json({
        message: message
      })
    }
  }

  removerUsuario(req: Request, res: Response): void {
    try {
      const { cpf } = req.params;
      const usuario = this.usuarioService.exibeUsuarioPorCpf(cpf);
      this.usuarioService.removeUsuario(cpf);
      res.status(200).json({
        message: "Usuário removido com sucesso!!!",
        usuario: usuario,
      });
    } catch (error: unknown) {
      let message = "Não foi possível excluir usuário!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
