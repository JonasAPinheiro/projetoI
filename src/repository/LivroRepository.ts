import { LivroEntity } from "../model/LivroEntity";

export class LivroRepository {
  private static instance: LivroRepository;
  private livroList: LivroEntity[] = [];

  constructor() {}

  static getInstance(): LivroRepository {
    if (!this.instance) {
      this.instance = new LivroRepository();
    }
    return this.instance;
  }

  exibirLivros(): LivroEntity[] {
    return this.livroList;
  }

  exibirLivroPorIsbn(isbn: string): LivroEntity {
    const index = this.findIndex(isbn);
    return this.livroList[index];
  }

  exibirLivroPorId(id: number): LivroEntity {
    const index = this.findIndex(id);
    return this.livroList[index];
  }

  insereLivro(livro: LivroEntity) {
    this.livroList.push(livro);
  }

  atualizaLivro(isbn: string, novoLivro: LivroEntity) {
    const index = this.findIndex(isbn);
    this.livroList[index] = novoLivro;
  }

  removeLivro(isbn: string) {
    const index = this.findIndex(isbn);
    this.livroList.splice(index, 1);
  }

  private findIndex(busca: string | number): number {
    if(typeof busca == "string"){
      const index = this.livroList.findIndex((l) => l.isbn == busca);
      if (index == -1) {
        throw new Error("O isbn do Livro não foi encontrado !!!");
      }
      return index
    }else{
      const index = this.livroList.findIndex((l) => l.id == busca);
      if (index == -1) {
        throw new Error("O id do Livro não foi encontrado !!!");
      }
      return index;
    }
  }
}
