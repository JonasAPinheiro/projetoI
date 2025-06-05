"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarioList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    exibirUsuarios() {
        return this.usuarioList;
    }
    exibirUsuarioPorCpf(cpf) {
        const index = this.findIndex(cpf);
        return this.usuarioList[index];
    }
    insereUsuario(usuario) {
        this.usuarioList.push(usuario);
    }
    atualizaUsuario(cpf, novoUsuario) {
        const index = this.findIndex(cpf);
        this.usuarioList[index] = novoUsuario;
    }
    removeUsuario(cpf) {
        const index = this.findIndex(cpf);
        this.usuarioList.splice(index, 1);
    }
    buscarUsuarioPorCpf(cpf) {
        return this.usuarioList.find((u) => u.cpf === cpf);
    }
    findIndex(cpf) {
        const index = this.usuarioList.findIndex((u) => u.cpf == cpf);
        if (index == -1) {
            throw new Error("O cpf do Usuário não foi encontrado!!!");
        }
        return index;
    }
}
exports.UsuarioRepository = UsuarioRepository;
