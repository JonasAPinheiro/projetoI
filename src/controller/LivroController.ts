import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  private livroService = new LivroService();

  async listarLivros(req: Request, res: Response): Promise<void> {
    try {
      const livros = await this.livroService.exibeLivros();
      res.status(200).json(livros);
    } catch (err: unknown) {
      let message: string = "Não foi possível listar os livros!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async listarLivroPorIsbn(req: Request, res: Response): Promise<void> {
    try {
      const { isbn } = req.params;
      const livro = await this.livroService.exibeLivroPorIsbn(isbn);
      res.status(200).json(livro);
    } catch (err: unknown) {
      let message: string = "Não foi possível encontrar livro com esse ISBN!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async cadastrarLivro(req: Request, res: Response): Promise<void> {
    try {
      const livro = await this.livroService.novoLivro(req.body);
      res.status(201).json({
        message: "Livro cadastrado com sucesso!!!",
        livro: livro,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível cadastrar livro!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async atualizarLivro(req: Request, res: Response): Promise<void> {
    try {
      const { isbn } = req.params;
      const livro = await this.livroService.atualizaLivro(isbn, req.body);
      res.status(200).json({
        message: "Livro atualizado com sucesso!!!",
        livro: livro,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível atualizar livro!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async removerLivro(req: Request, res: Response): Promise<void> {
    try {
      const { isbn } = req.params;
      const livro = await this.livroService.exibeLivroPorIsbn(isbn);
      await this.livroService.removeLivro(isbn);
      res.status(200).json({
        message: "Livro removido com sucesso!!!",
        livro: livro,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível remover livro!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
