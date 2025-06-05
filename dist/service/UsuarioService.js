"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/UsuarioEntity");
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
        if (!data.nome || !data.cpf || data.ativo == undefined || !data.categoriaId || !data.cursoId) {
            throw new Error("Preencha todos os campos!!!");
        }
        const usuario = new UsuarioEntity_1.UsuarioEntity(undefined, data.nome, data.cpf, data.ativo, data.categoriaId, data.cursoId);
        this.usuarioRepository.insereUsuario(usuario);
        return usuario;
    }
    atualizaUsuario(cpf, data) {
        if (!data.nome || !data.cpf || data.ativo == undefined || !data.categoriaId || !data.cursoId) {
            throw new Error("Preencha todos os campos!!!");
        }
        const usuarioAtual = this.usuarioRepository.exibirUsuarioPorCpf(cpf);
        const novoUsuario = new UsuarioEntity_1.UsuarioEntity(usuarioAtual.id, data.nome, usuarioAtual.cpf, data.ativo, data.categoriaId, data.cursoId);
        this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);
        return novoUsuario;
    }
    removeUsuario(cpf) {
        this.usuarioRepository.removeUsuario(cpf);
    }
}
exports.UsuarioService = UsuarioService;
