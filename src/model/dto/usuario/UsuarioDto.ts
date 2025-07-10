import { Status } from "../../types/Status";

export class UsuarioDto {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  ativo: Status;
  categoriaId: number;
  cursoId: number;

  constructor(
    id: any,
    nome: any,
    email: any,
    cpf: any,
    ativo: any,
    categoriaId: any,
    cursoId: any
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
  }
}