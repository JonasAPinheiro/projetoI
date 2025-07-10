import executarComandoSQL from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";

export class LivroRepository {
  private static instance: LivroRepository;

  constructor() {}

  async init() {
    await this.createTable();
  }

  static getInstance(): LivroRepository {
    if (!this.instance) {
      this.instance = new LivroRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.Livro(
      id int primary key auto_increment,
      titulo varchar(100) not null,
      autor varchar(100) not null,
      editora varchar(50) not null,
      edicao varchar(20) not null,
      isbn varchar(13) not null unique,
      categoriaId int not null,
      foreign key (categoriaId) references CategoriaLivro(id)
    )`;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Tabela Livro criada com sucesso!!!");
    } catch (err) {
      console.error("Erro ao executar a query: ", err);
    }
  }

  async exibirLivros(): Promise<LivroEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Livro`, []);

    return resultado.map((linha: any) => {
      return new LivroEntity(
        linha.id,
        linha.titulo,
        linha.autor,
        linha.editora,
        linha.edicao,
        linha.isbn,
        linha.categoriaId
      );
    });
  }

  async exibirLivroPorIsbn(isbn: string): Promise<LivroEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Livro WHERE isbn = ?`, [isbn]);

    const livro = resultado[0];

    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    return new LivroEntity(
      livro.id,
      livro.titulo,
      livro.autor,
      livro.editora,
      livro.edicao,
      livro.isbn,
      livro.categoriaId
    );
  }

  async exibirLivroPorId(id: number): Promise<LivroEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Livro WHERE id = ?`, [id]);

    const livro = resultado[0];

    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    return new LivroEntity(
      livro.id,
      livro.titulo,
      livro.autor,
      livro.editora,
      livro.edicao,
      livro.isbn,
      livro.categoriaId
    );
  }

  async insereLivro(livro: LivroEntity): Promise<LivroEntity> {
    const { titulo, autor, editora, edicao, isbn, categoriaId } = livro;
    const resultado = await executarComandoSQL(
      `
      INSERT INTO projbiblioteca.Livro(
      titulo, autor, editora, edicao, isbn, categoriaId) VALUES(?, ?, ?, ?, ?, ?)
      `,
      [titulo, autor, editora, edicao, isbn, categoriaId]
    );

    const novoLivro = new LivroEntity(resultado.insertId, titulo, autor, editora, edicao, isbn, categoriaId);
    console.log("Livro inserido com sucesso:", novoLivro);
    return novoLivro;
  }

  async atualizaLivro(isbn: string, novoLivro: LivroEntity): Promise<LivroEntity> {
    const { titulo, autor, editora, edicao, categoriaId } = novoLivro;

    await executarComandoSQL(
      `
      UPDATE projbiblioteca.Livro SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoriaId = ? WHERE isbn = ?
      `,
      [titulo, autor, editora, edicao, categoriaId, isbn]
    );

    const livroAtualizado = await this.exibirLivroPorIsbn(isbn);
    console.log("Livro atualizado com sucesso:", livroAtualizado);
    return livroAtualizado;
  }

  async removeLivro(isbn: string): Promise<LivroEntity> {
    const livroExcluido = await this.exibirLivroPorIsbn(isbn);
    await executarComandoSQL(`DELETE FROM projbiblioteca.Livro WHERE isbn = ?`, [isbn]);

    console.log("Livro deletado com sucesso:", livroExcluido);
    return livroExcluido;
  }
}
