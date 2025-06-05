import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository {
  private static instance: UsuarioRepository;
  private usuarioList: UsuarioEntity[] = [];

  constructor() {}

  static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  exibirUsuarios(): UsuarioEntity[]{
    return this.usuarioList;
  }

  exibirUsuarioPorCpf(cpf: string): UsuarioEntity{
    const index = this.findIndex(cpf);
    return this.usuarioList[index];
  }

  insereUsuario(usuario: UsuarioEntity) {
    this.usuarioList.push(usuario);
  }

  atualizaUsuario(cpf: string, novoUsuario: UsuarioEntity) {
    const index = this.findIndex(cpf);
    this.usuarioList[index] = novoUsuario;
  }

  removeUsuario(cpf: string) {
    const index = this.findIndex(cpf);
    this.usuarioList.splice(index, 1);
  }

  private findIndex(cpf: string): number {
    const index = this.usuarioList.findIndex((u) => u.cpf == cpf);
    if (index == -1) {
      throw new Error("O cpf do Usuário não foi encontrado!!!");
    }
    return index;
  }
}
