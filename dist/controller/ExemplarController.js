"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExemplarController = void 0;
const ExemplarService_1 = require("../service/ExemplarService");
class ExemplarController {
    exemplarService = new ExemplarService_1.ExemplarService();
    listarExemplares(req, res) {
        try {
            const exemplares = this.exemplarService.exibeExemplares();
            res.status(200).json(exemplares);
        }
        catch (error) {
            let message = "Não foi possível listar os exemplares!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarExemplarPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const codigoNum = parseInt(codigo);
            const exemplar = this.exemplarService.exibeExemplarPorCodigo(codigoNum);
            if (isNaN(codigoNum)) {
                throw new Error("Código inválido!");
            }
            res.status(200).json(exemplar);
        }
        catch (error) {
            let message = "Não foi possível encontrar o exemplar com esse código!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    cadastrarExemplar(req, res) {
        try {
            const exemplar = this.exemplarService.novoExemplar(req.body);
            res.status(201).json({
                message: "Exemplar cadastrado com sucesso!!!",
                exemplar: exemplar,
            });
        }
        catch (error) {
            let message = "Não foi possível cadastrar exemplar!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarExemplar(req, res) {
        try {
            const { codigo } = req.params;
            const codigoNum = parseInt(codigo);
            const exemplar = this.exemplarService.atualizaExemplar(codigoNum, req.body);
            if (isNaN(codigoNum)) {
                throw new Error("Código inválido!");
            }
            res.status(200).json({
                message: "Exemplar atualizado com sucesso!!!",
                exemplar: exemplar,
            });
        }
        catch (error) {
            let message = "Não foi possível ataualizar exemplar!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerExemplar(req, res) {
        try {
            const { codigo } = req.params;
            const codigoNum = parseInt(codigo);
            const exemplar = this.exemplarService.exibeExemplarPorCodigo(codigoNum);
            if (isNaN(codigoNum)) {
                throw new Error("Código inválido!");
            }
            this.exemplarService.removeExemplar(codigoNum);
            res.status(200).json({
                message: "Exemplar removido com sucesso!!!",
                exemplar: exemplar,
            });
        }
        catch (error) {
            let message = "Não foi possível remover exemplar!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.ExemplarController = ExemplarController;
