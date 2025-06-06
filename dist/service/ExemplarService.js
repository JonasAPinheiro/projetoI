"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExemplarService = void 0;
const ExemplarEntity_1 = require("../model/ExemplarEntity");
const ExemplarRepository_1 = require("../repository/ExemplarRepository");
class ExemplarService {
    exemplarRepository = ExemplarRepository_1.ExemplarRepository.getInstance();
    exibeExemplares() {
        return this.exemplarRepository.exibirExemplares();
    }
    exibeExemplarPorCodigo(codigo) {
        return this.exemplarRepository.exibirExemplarPorCodigo(codigo);
    }
    novoExemplar(data) {
        if (!data.quantidade || !data.quantidadeEmprestada || data.disponivel == undefined || !data.livroId) {
            throw new Error("Preencha todos os campos !!!");
        }
        const exemplar = new ExemplarEntity_1.ExemplarEntity(undefined, data.quantidade, data.quantidadeEmprestada, data.disponivel, data.livroId);
        this.exemplarRepository.insereExemplar(exemplar);
        return exemplar;
    }
    atualizaExemplar(codigo, data) {
        const exemplarAtual = this.exemplarRepository.exibirExemplarPorCodigo(codigo);
        if (!data.quantidade || !data.quantidadeEmprestada || data.disponivel == undefined || !data.livroId) {
            throw new Error("Preencha todos os campos !!!");
        }
        const novoExemplar = new ExemplarEntity_1.ExemplarEntity(exemplarAtual.codigo, data.quantidade, data.quantidadeEmprestada, data.disponivel, data.livroId);
        this.exemplarRepository.atualizaExemplar(codigo, novoExemplar);
        return novoExemplar;
    }
    removeExemplar(codigo) {
        this.exemplarRepository.removeExemplar(codigo);
    }
}
exports.ExemplarService = ExemplarService;
