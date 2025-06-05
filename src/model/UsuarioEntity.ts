export class UsuarioEntity {
  id: number;
  nome: string;
  cpf: string;
  ativo: boolean;
  categoriaId: number;
  cursoId: number;

  constructor(
    id: number | undefined,
    nome: string,
    cpf: string,
    ativo: boolean,
    categoriaId: number,
    cursoId: number
  ) {
    this.id = id ?? this.gerarId();
    this.nome = nome;
    this.cpf = cpf;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
  }

  private gerarId(): number {
    return parseInt((Date.now() / 100).toString(), 10);
  }
}
