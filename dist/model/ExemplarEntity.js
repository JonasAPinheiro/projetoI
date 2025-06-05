"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExemplarEntity = void 0;
class ExemplarEntity {
    codigo;
    quantidade;
    quantidadeEmprestada;
    disponivel;
    livroId;
    constructor(codigo, quantidade, quantidadeEmprestada, disponivel, livroId) {
        this.codigo = codigo ?? this.gerarCodigo();
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada;
        this.disponivel = disponivel;
        this.livroId = livroId;
    }
    gerarCodigo() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.ExemplarEntity = ExemplarEntity;
