export class CategoriaLivroEntity {
  id: number;
  nome: string;

  constructor(id: number | undefined, nome: string) {
    this.id = id ?? 0;
    this.nome = nome;
  }
}
