"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const ExemplarRepository_1 = require("../repository/ExemplarRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    exemplarRepository = ExemplarRepository_1.ExemplarRepository.getInstance();
    exibeEmprestimos() {
        return this.emprestimoRepository.exibirEmprestimos();
    }
    novoEmprestimo(data) {
        const usuario = this.usuarioRepository.buscarUsuarioPorId(data.usuarioId);
        if (!usuario) {
            throw new Error("Usuário não existe!!!");
        }
        if (usuario.ativo != true) {
            throw new Error("Usuário inativo, não é possível realizar o empréstimo!!!");
        }
        if (!data.usuarioId || !data.exemplarId || !data.dataEmprestimo) {
            throw new Error("Preencha todos os campos!!!");
        }
        const emprestimosPendentes = this.emprestimoRepository.exibirEmprestimos()
            .filter(e => e.usuarioId === data.usuarioId && !e.dataEntrega);
        if (emprestimosPendentes.length > 0) {
            throw new Error("Usuário possui empréstimos pendentes, regularize-os antes de novo empréstimo.");
        }
        const exemplar = this.exemplarRepository.exibirExemplarPorCodigo(data.exemplarId);
        if (!exemplar) {
            throw new Error("Exemplar não existe!!!");
        }
        if (exemplar.quantidade <= exemplar.quantidadeEmprestada) {
            throw new Error("Exemplar não está disponível para empréstimo!!!");
        }
        const dataEmprestimo = new Date(data.dataEmprestimo);
        const prazoDias = 7;
        const dataDevolucao = new Date(dataEmprestimo.getTime() + prazoDias * 24 * 60 * 60 * 1000);
        const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(undefined, data.usuarioId, data.exemplarId, data.dataEmprestimo, dataDevolucao, null, 0, null);
        this.emprestimoRepository.insereEmprestimo(emprestimo);
        exemplar.quantidadeEmprestada++;
        exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
        this.exemplarRepository.atualizaExemplar(data.exemplarId, exemplar);
        return emprestimo;
    }
    registraDevolucao(id, data) {
        const emprestimo = this.emprestimoRepository.exibirEmprestimoPorId(id);
        if (emprestimo.dataEntrega) {
            throw new Error("Este empréstimo já foi devolvido!!!");
        }
        emprestimo.dataEntrega = new Date(data.dataEntrega);
        const diasAtraso = this.calcularAtraso(emprestimo);
        this.aplicarSuspensao(emprestimo, diasAtraso);
        this.emprestimoRepository.atualizaEmprestimo(emprestimo.id, emprestimo);
        const exemplar = this.exemplarRepository.exibirExemplarPorCodigo(emprestimo.exemplarId);
        if (exemplar) {
            exemplar.quantidadeEmprestada--;
            exemplar.disponivel = exemplar.quantidade > exemplar.quantidadeEmprestada;
            this.exemplarRepository.atualizaExemplar(emprestimo.exemplarId, exemplar);
        }
        return emprestimo;
    }
    calcularAtraso(emprestimo) {
        const devolucao = new Date(emprestimo.dataDevolucao);
        const entrega = emprestimo.dataEntrega;
        if (!entrega) {
            throw new Error("Data de entrega inválida!!!");
        }
        const atrasoMs = entrega.getTime() - devolucao.getTime();
        const diasAtraso = Math.max(Math.ceil(atrasoMs / (1000 * 60 * 60 * 24)), 0);
        emprestimo.diasAtraso = diasAtraso;
        return diasAtraso;
    }
    aplicarSuspensao(emprestimo, diasAtraso) {
        if (diasAtraso > 0) {
            const entrega = emprestimo.dataEntrega;
            if (!entrega) {
                throw new Error("Data de entrega inválida!!!");
            }
            const suspensaoDias = diasAtraso * 3;
            const suspensao = new Date(entrega.getTime() + suspensaoDias * 86400000);
            emprestimo.suspensaoAte = suspensao;
            const usuario = this.usuarioRepository.buscarUsuarioPorId(emprestimo.usuarioId);
            if (usuario) {
                if (suspensaoDias > 60) {
                    usuario.ativo = false;
                }
                else {
                    const emprestimosUsuario = this.emprestimoRepository.exibirEmprestimos().filter((e) => e.usuarioId == usuario.id && e.suspensaoAte && new Date(e.suspensaoAte) > new Date());
                    if (emprestimosUsuario.length > 2) {
                        usuario.ativo = false;
                    }
                }
                this.usuarioRepository.atualizaUsuario(usuario.cpf, usuario);
            }
        }
    }
}
exports.EmprestimoService = EmprestimoService;
