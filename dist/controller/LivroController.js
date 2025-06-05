"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    listarLivros(req, res) {
        try {
            const livros = this.livroService.exibeLivros();
            res.status(200).json(livros);
        }
        catch (error) {
            let message = "Não foi possível listar os livros!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    listarLivroPorIsbn(req, res) {
        try {
            const { isbn } = req.params;
            const livro = this.livroService.exibeLivroPorIsbn(isbn);
            res.status(200).json(livro);
        }
        catch (error) {
            let message = "Não foi possível encontrar livro com esse ISBN!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    cadastrarLivro(req, res) {
        try {
            const livro = this.livroService.novoLivro(req.body);
            res.status(201).json({
                message: "Livro cadastrado com sucesso!!!",
                livro: livro,
            });
        }
        catch (error) {
            let message = "Não foi possível cadastrar livro!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    atualizarLivro(req, res) {
        try {
            const { isbn } = req.params;
            const livro = this.livroService.atualizaLivro(isbn, req.body);
            res.status(200).json({
                message: "Livro atualizado com sucesso!!!",
                livro: livro,
            });
        }
        catch (error) {
            let message = "Não foi possível atualizar livro!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    removerLivro(req, res) {
        try {
            const { isbn } = req.params;
            const livro = this.livroService.exibeLivroPorIsbn(isbn);
            this.livroService.removeLivro(isbn);
            res.status(200).json({
                message: "Livro removido com sucesso!!!",
                livro: livro,
            });
        }
        catch (error) {
            let message = "Não foi possível remover livro!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
}
exports.LivroController = LivroController;
