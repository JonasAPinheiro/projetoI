export class LivroUpdateDto {
  titulo: string;
  autor: string;
  editora: string;
  edicao: string;
  categoriaId: number;

  constructor(
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    categoriaId: number
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.edicao = edicao;
    this.categoriaId = categoriaId;
  }
}
