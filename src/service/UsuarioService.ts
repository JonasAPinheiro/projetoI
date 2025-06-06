import { UsuarioEntity } from "../model/UsuarioEntity";
import { categoriasUsuario } from "../repository/CategoriaUsuarioRepository";
import { cursos } from "../repository/CursoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
  private usuarioRepository = UsuarioRepository.getInstance();

  exibeUsuarios(): UsuarioEntity[]{
    return this.usuarioRepository.exibirUsuarios();
  }

  exibeUsuarioPorCpf(cpf: string): UsuarioEntity{
    return this.usuarioRepository.exibirUsuarioPorCpf(cpf);
  }

  novoUsuario(data: any): UsuarioEntity {
    if (!data.nome ||!data.cpf ||!data.categoriaId || !data.cursoId
    ) {
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

    const usuario = new UsuarioEntity(undefined, data.nome, data.cpf, true, data.categoriaId, data.cursoId
    );
    this.usuarioRepository.insereUsuario(usuario);

    return usuario;
  }

  atualizaUsuario(cpf:string, data: any): UsuarioEntity{
    const usuarioAtual = this.usuarioRepository.exibirUsuarioPorCpf(cpf);
    if (!data.nome || data.ativo == undefined || !data.categoriaId || !data.cursoId) 
    {
      throw new Error("Preencha todos os campos!!!");
    }

    if (data.cpf != usuarioAtual.cpf) {
      throw new Error("Não é permitido alterar o CPF!!!");
    }

    this.validarCategoria(data.categoriaId);
    this.validarCurso(data.cursoId);

    const novoUsuario = new UsuarioEntity(usuarioAtual.id ,data.nome, usuarioAtual.cpf, data.ativo, data.categoriaId, data.cursoId);
    this.usuarioRepository.atualizaUsuario(cpf, novoUsuario);

    return novoUsuario;
  }

  removeUsuario(cpf: string){
    this.usuarioRepository.removeUsuario(cpf);
  }

  private calcularDigitoVerificador(cpf: string, pesoInicial: number): number {
    let soma = 0;
    for (let i = 0; i < pesoInicial - 1; i++) {
      soma += Number(cpf[i]) * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }
  
  private sequenciaRepetidaCpf(cpf: string): boolean {
    const primeiroDigito = cpf[0];
    for(let i = 1; i < cpf.length; i++){
      if(cpf[i] != primeiroDigito){
        return false;
      }
    }
    return true;
  }

  private validarCpf(cpf: string): boolean{
    cpf = cpf.replace(/[^\d]/g, "");

    if(cpf.length != 11){
      return false;
    }

    if(this.sequenciaRepetidaCpf(cpf)){
      return false;
    }
    const digito1 = this.calcularDigitoVerificador(cpf, 10);
    const digito2 = this.calcularDigitoVerificador(cpf, 11);

    return digito1 === Number(cpf[9]) && digito2 === Number(cpf[10]);
  }

  private validarCategoria(id: any): void {
    if (!categoriasUsuario.find(categoria => categoria.id === id)) 
    {
      throw new Error("Categoria não existe!!!");
    }
  }

  private validarCurso(id: any): void {
    if (!cursos.find(curso => curso.id === id)) 
    {
      throw new Error("Curso não existe!!!");
    }
  }
}
