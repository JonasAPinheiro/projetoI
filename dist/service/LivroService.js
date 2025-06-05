"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/LivroEntity");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    exibeLivros() {
        return this.livroRepository.exibirLivros();
    }
    exibeLivroPorIsbn(isbn) {
        return this.livroRepository.exibirLivroPorIsbn(isbn);
    }
    novoLivro(data) {
        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
            throw new Error("Preencha todos os campos!!!");
        }
        const livro = new LivroEntity_1.LivroEntity(undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);
        this.livroRepository.insereLivro(livro);
        return livro;
    }
    atualizaLivro(isbn, data) {
        const livroAtual = this.livroRepository.exibirLivroPorIsbn(isbn);
        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
            throw new Error("Preencha todos os campos!!!");
        }
        const novoLivro = new LivroEntity_1.LivroEntity(livroAtual.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);
        this.livroRepository.atualizaLivro(isbn, novoLivro);
        return novoLivro;
    }
    removeLivro(isbn) {
        this.livroRepository.removeLivro(isbn);
    }
}
exports.LivroService = LivroService;
