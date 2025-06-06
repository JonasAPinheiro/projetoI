"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/LivroEntity");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
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
        this.validarCategoria(data.categoriaId);
        this.validarCombinacao(data.autor, data.editora, data.edicao);
        const livro = new LivroEntity_1.LivroEntity(undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);
        this.livroRepository.insereLivro(livro);
        return livro;
    }
    atualizaLivro(isbn, data) {
        const livroAtual = this.livroRepository.exibirLivroPorIsbn(isbn);
        if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
            throw new Error("Preencha todos os campos!!!");
        }
        this.validarCategoria(data.categoriaId);
        const novoLivro = new LivroEntity_1.LivroEntity(livroAtual.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);
        this.livroRepository.atualizaLivro(isbn, novoLivro);
        return novoLivro;
    }
    removeLivro(isbn) {
        this.livroRepository.removeLivro(isbn);
    }
    validarCategoria(id) {
        if (!CategoriaLivroRepository_1.categoriasLivro.find(categoria => categoria.id === id)) {
            throw new Error("Categoria não existe!!!");
        }
    }
    validarCombinacao(autor, editora, edicao) {
        const livros = this.livroRepository.exibirLivros();
        const combinação = livros.find(livro => livro.autor == autor && livro.editora === editora && livro.edicao == edicao);
        if (combinação) {
            throw new Error("Já existe um livro com essa combinação de autor, editora e edição!!!");
        }
    }
}
exports.LivroService = LivroService;
