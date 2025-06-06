"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
class EmprestimoEntity {
    id;
    usuarioId;
    exemplarId;
    dataEmprestimo;
    dataDevolucao;
    dataEntrega;
    diasAtraso;
    suspensaoAte;
    constructor(id, usuarioId, exemplarId, dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte) {
        this.id = id ?? this.gerarId();
        this.usuarioId = usuarioId;
        this.exemplarId = exemplarId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.dataEntrega = dataEntrega;
        this.diasAtraso = diasAtraso;
        this.suspensaoAte = suspensaoAte;
    }
    gerarId() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.EmprestimoEntity = EmprestimoEntity;
