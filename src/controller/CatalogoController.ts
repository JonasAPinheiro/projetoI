import { CatalogoService } from "../service/CatalogoService";
import { Request, Response } from "express";

export class CatalogoController {
  private catalogoService = new CatalogoService();

  listarCategoriasUsuario(req: Request, res: Response): void {
    try {
      const categorias = this.catalogoService.listarCategoriasUsuarios();
      res.status(200).json(categorias);
    } catch (error: unknown) {
      let message: string =
        "Não foi possivel listar as categorias de usuários!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  listarCategoriasLivro(req: Request, res: Response): void {
    try {
      const categorias = this.catalogoService.listarCategoriasLivros();
      res.status(200).json(categorias);
    } catch (error: unknown) {
      let message: string =
        "Não foi possível listar as categorias de livros!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  listarCursos(req: Request, res: Response): void {
    try {
      const cursos = this.catalogoService.listarCursos();
      res.status(200).json(cursos);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os cursos!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
