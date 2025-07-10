export class LivroRequestDto {
  titulo: string;
  autor: string;
  editora: string;
  edicao: string;
  isbn: string;
  categoriaId: number;

  constructor(
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    isbn: string,
    categoriaId: number
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.edicao = edicao;
    this.isbn = isbn;
    this.categoriaId = categoriaId;
  }
}
