import { Status } from "../../types/Status";

export class UsuarioUpdateDto {
  nome: string;
  email: string;
  ativo: Status;
  categoriaId: number;
  cursoId: number;

  constructor(
    nome: string,
    email: string,
    ativo: Status,
    categoriaId: number,
    cursoId: number
  ) {
    this.nome = nome;
    this.email = email;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
  }
}