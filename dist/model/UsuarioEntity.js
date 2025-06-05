"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    id;
    nome;
    cpf;
    ativo;
    categoriaId;
    cursoId;
    constructor(id, nome, cpf, ativo, categoriaId, cursoId) {
        this.id = id ?? this.gerarId();
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = ativo;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
    gerarId() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.UsuarioEntity = UsuarioEntity;
