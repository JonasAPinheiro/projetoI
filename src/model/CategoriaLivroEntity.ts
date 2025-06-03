export class CategoriaLivroEntity {
  id: number;
  nome: string;

  constructor(id: number | undefined, nome: string) {
    this.id = id ?? this.gerarId();
    this.nome = nome;
  }

  private gerarId(): number {
    return parseInt((Date.now() / 100).toString(), 10);
  }
}
