export class LivroEntity {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  edicao: string;
  isbn: string;
  categoriaId: number;

  constructor(
    id: number | undefined,
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    isbn: string,
    categoriaId: number
  ) {
    this.id = id ?? this.gerarId();
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.edicao = edicao;
    this.isbn = isbn;
    this.categoriaId = categoriaId;
  }

  private gerarId(): number {
    return parseInt((Date.now() / 100).toString(), 10);
  }
}
