import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  private livroService = new LivroService();

  listarLivros(req: Request, res: Response): void {
    try {
      const livros = this.livroService.exibeLivros();
      res.status(200).json(livros);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os livros!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  listarLivroPorIsbn(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;
      const livro = this.livroService.exibeLivroPorIsbn(isbn);
      res.status(200).json(livro);
    } catch (error: unknown) {
      let message: string = "Não foi possível encontrar livro com esse ISBN!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  cadastrarLivro(req: Request, res: Response): void {
    try {
      const livro = this.livroService.novoLivro(req.body);
      res.status(201).json({
        message: "Livro cadastrado com sucesso!!!",
        livro: livro,
      });
    } catch (error: unknown) {
      let message: string = "Não foi possível cadastrar livro!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  atualizarLivro(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;
      const livro = this.livroService.atualizaLivro(isbn, req.body);
      res.status(200).json({
        message: "Livro atualizado com sucesso!!!",
        livro: livro,
      });
    } catch (error: unknown) {
      let message: string = "Não foi possível atualizar livro!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  removerLivro(req: Request, res: Response): void {
    try {
      const { isbn } = req.params;
      const livro = this.livroService.exibeLivroPorIsbn(isbn);
      this.livroService.removeLivro(isbn);
      res.status(200).json({
        message: "Livro removido com sucesso!!!",
        livro: livro,
      });
    } catch (error: unknown) {
      let message: string = "Não foi possível remover livro!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
