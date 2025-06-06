"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimoList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    exibirEmprestimos() {
        return this.emprestimoList;
    }
    exibirEmprestimoPorId(id) {
        const index = this.findIndex(id);
        return this.emprestimoList[index];
    }
    insereEmprestimo(emprestimo) {
        this.emprestimoList.push(emprestimo);
    }
    atualizaEmprestimo(id, novoEmprestimo) {
        const index = this.findIndex(id);
        this.emprestimoList[index] = novoEmprestimo;
    }
    findIndex(id) {
        const index = this.emprestimoList.findIndex((e) => e.id == id);
        if (index == -1) {
            throw new Error("O id do empréstimo não foi encontrado!!!");
        }
        return index;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
