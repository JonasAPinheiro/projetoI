"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/UsuarioEntity");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    exibeUsuarios() {
        return this.usuarioRepository.exibirUsuarios();
    }
    exibeUsuarioPorCpf(cpf) {
        return this.usuarioRepository.exibirUsuarioPorCpf(cpf);
    }
    novoUsuario(data) {
        if (!data.nome || !data.cpf || !data.categoriaId || !data.cursoId) {
            throw new Error("Preencha todos os campos!!!");
        }
        if (this.usuarioRepository.buscarUsuarioPorCpf(data.cpf)) {
            throw new Error("Cpf já cadastrado em outro usuário!!!");
        }
        if (!this.validarCpf(data.cpf)) {
            throw new Error("Cpf inválido!!!");
        }
        this.validarCategoria(data.categoriaId);
        this.validarCurso(data.cursoId);
        const usuario = new UsuarioEntity_1.UsuarioEntity(undefined, data.nome, data.cpf, true, data.categoriaId, data.cursoId);
        this.usuarioRepository.insereUsuario(usuario);
        return usuario;
    }
    atualizaUsuario(cpf, data) {
        const usuarioAtual = this.usuarioRepository.exibirUsuarioPorCpf(cpf);
        if (!data.nome || data.ativo == undefined || !data.categoriaId || !data.cursoId) {
            throw new Error("Preencha todos os campos!!!");
        }
        if (data.cpf != usuarioAtual.cpf) {
            throw new Error("Não é permitido alterar o CPF");
        }
        this.validarCategoria(data.categoriaId);
        this.validarCurso(data.cursoId);
        const novoUsuario = new UsuarioEntity_1.UsuarioEntity(usuarioAtual.id, data.nome, usuarioAtual.cpf, data.ativo, data.categoriaId, data.cursoId);
        this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);
        return novoUsuario;
    }
    removeUsuario(cpf) {
        this.usuarioRepository.removeUsuario(cpf);
    }
    calcularDigitoVerificador(cpf, pesoInicial) {
        let soma = 0;
        for (let i = 0; i < pesoInicial - 1; i++) {
            soma += Number(cpf[i]) * (pesoInicial - i);
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
    sequenciaRepetidaCpf(cpf) {
        const primeiroDigito = cpf[0];
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] != primeiroDigito) {
                return false;
            }
        }
        return true;
    }
    validarCpf(cpf) {
        cpf = cpf.replace(/[^\d]/g, "");
        if (cpf.length != 11) {
            return false;
        }
        if (this.sequenciaRepetidaCpf(cpf)) {
            return false;
        }
        const digito1 = this.calcularDigitoVerificador(cpf, 10);
        const digito2 = this.calcularDigitoVerificador(cpf, 11);
        return digito1 === Number(cpf[9]) && digito2 === Number(cpf[10]);
    }
    validarCategoria(id) {
        if (!CategoriaUsuarioRepository_1.categoriasUsuario.find(categoria => categoria.id === id)) {
            throw new Error("Categoria não existe!!!");
        }
    }
    validarCurso(id) {
        if (!CursoRepository_1.cursos.find(curso => curso.id === id)) {
            throw new Error("Curso não existe!!!");
        }
    }
}
exports.UsuarioService = UsuarioService;
