"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoEntity = void 0;
class CursoEntity {
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
exports.CursoEntity = CursoEntity;
