"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    listarEmprestimos(req, res) {
        try {
            const emprestimos = this.emprestimoService.exibeEmprestimos();
            res.status(200).json(emprestimos);
        }
        catch (error) {
            let message = "Não foi possível listar os empréstimos!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    cadastrarEmprestimo(req, res) {
        try {
            const emprestimo = this.emprestimoService.novoEmprestimo(req.body);
            res.status(201).json({
                message: "Empréstimo cadastrado com sucesso!!!",
                emprestimo: emprestimo,
            });
        }
        catch (error) {
            let message = "Não foi possível cadastrar empréstimo!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
    registrarDevolucao(req, res) {
        try {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new Error("Id inválido!!!");
            }
            const emprestimo = this.emprestimoService.registraDevolucao(idNum, req.body);
            res.status(200).json({
                message: "Devolução registrada com sucesso!!!",
                emprestimo: emprestimo,
            });
        }
        catch (error) {
            let message = "Não foi possível registrar devolução!!!";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message,
            });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
