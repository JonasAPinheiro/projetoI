import { Status } from "../../types/Status";

export class UsuarioRequestDto {
  nome: string;
  email: string;
  cpf: string;
  ativo: Status;
  categoriaId: number;
  cursoId: number;

  constructor(
    nome: string,
    email: string,
    cpf: string,
    ativo: Status,
    categoriaId: number,
    cursoId: number
  ) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
  }
}