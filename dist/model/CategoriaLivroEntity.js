"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroEntity = void 0;
class CategoriaLivroEntity {
    id;
    nome;
    constructor(id, nome) {
        this.id = id ?? this.gerarId();
        this.nome = nome;
    }
    gerarId() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.CategoriaLivroEntity = CategoriaLivroEntity;
