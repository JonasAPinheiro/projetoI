"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExemplarService = void 0;
const ExemplarEntity_1 = require("../model/ExemplarEntity");
const ExemplarRepository_1 = require("../repository/ExemplarRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class ExemplarService {
    exemplarRepository = ExemplarRepository_1.ExemplarRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    exibeExemplares() {
        return this.exemplarRepository.exibirExemplares();
    }
    exibeExemplarPorCodigo(codigo) {
        return this.exemplarRepository.exibirExemplarPorCodigo(codigo);
    }
    novoExemplar(data) {
        if (data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
            throw new Error("Preencha todos os campos !!!");
        }
        const livro = this.livroRepository.exibirLivroPorId(data.livroId);
        if (!livro) {
            throw new Error("Livro não encontrado!!!");
        }
        if (data.quantidadeEmprestada > data.quantidade) {
            throw new Error("Quantidade emprestada maior que quantidade no estoque!!!");
        }
        const disponivel = data.quantidade > data.quantidadeEmprestada;
        const exemplar = new ExemplarEntity_1.ExemplarEntity(undefined, data.quantidade, data.quantidadeEmprestada, disponivel, data.livroId);
        this.exemplarRepository.insereExemplar(exemplar);
        return exemplar;
    }
    atualizaExemplar(codigo, data) {
        const exemplarAtual = this.exemplarRepository.exibirExemplarPorCodigo(codigo);
        if (data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
            throw new Error("Preencha todos os campos !!!");
        }
        const livro = this.livroRepository.exibirLivroPorId(data.livroId);
        if (!livro) {
            throw new Error("Livro não encontrado!!!");
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
