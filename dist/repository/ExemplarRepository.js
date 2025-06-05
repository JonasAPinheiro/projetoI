"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExemplarRepository = void 0;
class ExemplarRepository {
    static instance;
    exemplarList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ExemplarRepository();
        }
        return this.instance;
    }
    exibirExemplares() {
        return this.exemplarList;
    }
    exibirExemplarPorCodigo(codigo) {
        const index = this.findIndex(codigo);
        return this.exemplarList[index];
    }
    insereExemplar(exemplar) {
        this.exemplarList.push(exemplar);
    }
    atualizaExemplar(codigo, novoExemplar) {
        const index = this.findIndex(codigo);
        this.exemplarList[index] = novoExemplar;
    }
    removeExemplar(codigo) {
        const index = this.findIndex(codigo);
        this.exemplarList.splice(index, 1);
    }
    findIndex(codigo) {
        const index = this.exemplarList.findIndex((e) => e.codigo == codigo);
        if (index == -1) {
            throw new Error("O código do exemplar não foi encontrado !!!");
        }
        return index;
    }
}
exports.ExemplarRepository = ExemplarRepository;
