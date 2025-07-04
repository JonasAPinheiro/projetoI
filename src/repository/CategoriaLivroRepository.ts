import executarComandoSQL from "../database/mysql";
import { CategoriaLivroEntity } from "../model/CategoriaLivroEntity";

export class CategoriaLivroRepository {
  private static instance: CategoriaLivroRepository;

  private constructor() {
    this.createTable();
  }

  static getInstance(): CategoriaLivroRepository {
    if (!this.instance) {
      this.instance = new CategoriaLivroRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.CategoriaLivro(
      id int primary key auto_increment,
      nome varchar(100) not null
    )`;
    try {
      await executarComandoSQL(query, []);
      console.log("Tabela CategoriaLivro criada com sucesso!!!");
      await this.insereCategoriasPadrao();
    } catch (err) {
      console.error(`Erro ao executar a query: ${err}`);
    }
  }

  private async insereCategoriasPadrao() {
    const resultado = await executarComandoSQL(`SELECT COUNT(*) as count FROM projbiblioteca.CategoriaLivro`, []);

    if (resultado[0].count > 0) {
      return;
    }

    const categorias = ["Romance", "Computação", "Letras", "Gestão", "Administração", "Conto", "Ficção Científica"];

    for (let i = 0; i < categorias.length; i++) {
      await executarComandoSQL(`INSERT INTO projbiblioteca.CategoriaLivro(nome) VALUES(?)`, [categorias[i]]);
    }
  }

  async exibirCategoriasLivros(): Promise<CategoriaLivroEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.CategoriaLivro`, []);

    return resultado.map((linha: any) => {
      return new CategoriaLivroEntity(linha.id, linha.nome);
    });
  }
}
