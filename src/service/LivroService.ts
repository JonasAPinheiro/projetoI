import { LivroEntity } from "../model/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
  private livroRepository = LivroRepository.getInstance();

  exibeLivros(): LivroEntity[]{
    return this.livroRepository.exibirLivros();
  }

  exibeLivroPorIsbn(isbn: string): LivroEntity{
    return this.livroRepository.exibirLivroPorIsbn(isbn);
  }

  novoLivro(data: any): LivroEntity {
    if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
      throw new Error("Preencha todos os campos!!!");
    }

    const livro = new LivroEntity(undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);

    this.livroRepository.insereLivro(livro);
    return livro;
  }

  atualizaLivro(isbn: string, data: any): LivroEntity {
    const livroAtual = this.livroRepository.exibirLivroPorIsbn(isbn);
    if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
      throw new Error("Preencha todos os campos!!!");
    }

    const novoLivro = new LivroEntity(livroAtual.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);

    this.livroRepository.atualizaLivro(isbn, novoLivro);

    return novoLivro;
  }

  removeLivro(isbn: string) {
    this.livroRepository.removeLivro(isbn);
  }
}