import { LivroEntity } from "../model/LivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
  private livroRepository = LivroRepository.getInstance();
  private categoriaLivroRepository = CategoriaLivroRepository.getInstance();

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

    this.validarCategoria(data.categoriaId);
    this.validarCombinacao(data.autor, data.editora, data.edicao);

    const livro = new LivroEntity(undefined, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);

    this.livroRepository.insereLivro(livro);
    return livro;
  }

  atualizaLivro(isbn: string, data: any): LivroEntity {
    const livroAtual = this.livroRepository.exibirLivroPorIsbn(isbn);
    if (!data.titulo || !data.autor || !data.editora || !data.edicao || !data.isbn || !data.categoriaId) {
      throw new Error("Preencha todos os campos!!!");
    }

    this.validarCategoria(data.categoriaId);

    const novoLivro = new LivroEntity(livroAtual.id, data.titulo, data.autor, data.editora, data.edicao, data.isbn, data.categoriaId);

    this.livroRepository.atualizaLivro(isbn, novoLivro);

    return novoLivro;
  }

  removeLivro(isbn: string) {
    this.livroRepository.removeLivro(isbn);
  }

  private async validarCategoria(id: number): Promise<void> {
    const categorias = await this.categoriaLivroRepository.exibirCategoriasLivros();
    const existe = categorias.some((categoria) => categoria.id === id);
    if (!existe) {
      throw new Error("Categoria não existe!!!");
    }
  }

  private validarCombinacao(autor: string, editora: string, edicao: string): void {
    const livros = this.livroRepository.exibirLivros(); 

    const combinação = livros.find(livro => livro.autor == autor && livro.editora === editora &&livro.edicao == edicao);

    if (combinação) {
      throw new Error("Já existe um livro com essa combinação de autor, editora e edição!!!");
    }
  }
}