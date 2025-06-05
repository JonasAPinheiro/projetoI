"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroEntity = void 0;
class LivroEntity {
    id;
    titulo;
    autor;
    editora;
    edicao;
    isbn;
    categoriaId;
    constructor(id, titulo, autor, editora, edicao, isbn, categoriaId) {
        this.id = id ?? this.gerarId();
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoriaId = categoriaId;
    }
    gerarId() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.LivroEntity = LivroEntity;
