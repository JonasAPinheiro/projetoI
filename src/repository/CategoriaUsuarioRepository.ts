import executarComandoSQL from "../database/mysql";
import { CategoriaUsuarioEntity } from "../model/CategoriaUsuarioEntity";

export class CategoriaUsuarioRepository {
  private static instance: CategoriaUsuarioRepository;

  private constructor() {
    this.createTable();
  }

  static getInstance(): CategoriaUsuarioRepository {
    if (!this.instance) {
      this.instance = new CategoriaUsuarioRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.CategoriaUsuario(
      id int primary key auto_increment,
      nome varchar(100) not null
    )`;
    try {
      await executarComandoSQL(query, []);
      console.log("Tabela CategoriaUsuario criada com sucesso!!!");
      await this.insereCategoriasPadrao();
    } catch (err) {
      console.error(`Erro ao executar a query: ${err}`);
    }
  }

  private async insereCategoriasPadrao() {
    const resultado = await executarComandoSQL(`SELECT COUNT(*) as count FROM projbiblioteca.CategoriaUsuario`, []);

    if (resultado[0].count > 0) {
      return;
    }

    const categorias = ["Professor", "Aluno", "Bibliotecário"];

    for (let i = 0; i < categorias.length; i++) {
      await executarComandoSQL(`INSERT INTO projbiblioteca.CategoriaUsuario(nome) VALUES(?)`, [categorias[i]]);
    }
  }

  async exibirCategoriasUsuarios(): Promise<CategoriaUsuarioEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.CategoriaUsuario`, []);

    return resultado.map((linha: any) => {
      return new CategoriaUsuarioEntity(linha.id, linha.nome);
    });
  }
}
