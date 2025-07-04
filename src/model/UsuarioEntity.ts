type Status = "ativo" | "inativo" | "suspenso";

export class UsuarioEntity {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: Status;
  categoriaId: number;
  cursoId: number;

  constructor(
    id: number | undefined,
    nome: string,
    email: string,
    cpf: string,
    ativo: Status,
    categoriaId: number,
    cursoId: number
  ) {
    if (!this.validarCpf(cpf)) {
      throw new Error("Cpf inválido!!!");
    }

    this.id = id ?? 0;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
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
    for (let i = 1; i < cpf.length; i++) {
      if (cpf[i] != primeiroDigito) {
        return false;
      }
    }
    return true;
  }

  private validarCpf(cpf: string): boolean {
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
}
