import executarComandoSQL from "../database/mysql";
import { CursoEntity } from "../model/CursoEntity";

export class CursoRepository {
  private static instance: CursoRepository;

  private constructor() {
    this.createTable();
  }

  static getInstance(): CursoRepository {
    if (!this.instance) {
      this.instance = new CursoRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.Curso(
      id int primary key auto_increment,
      nome varchar(100) not null
    )`;
    try {
      await executarComandoSQL(query, []);
      console.log("Tabela Curso criada com sucesso!!!");
      await this.insereCategoriasPadrao();
    } catch (err) {
      console.error(`Erro ao executar a query: ${err}`);
    }
  }

  private async insereCategoriasPadrao() {
    const resultado = await executarComandoSQL(`SELECT COUNT(*) as count FROM projbiblioteca.Curso`, []);

    if (resultado[0].count > 0) {
      return;
    }

    const cursos = ["Administração", "Análise e Desenvolvimento de Sistemas", "Educação Física", "Engenharia da Computação", "Nutrição"];

    for (let i = 0; i < cursos.length; i++) {
      await executarComandoSQL(`INSERT INTO projbiblioteca.Curso(nome) VALUES(?)`, [cursos[i]]);
    }
  }

  async exibirCursos(): Promise<CursoEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Curso`, []);

    return resultado.map((linha: any) => {
      return new CursoEntity(linha.id, linha.nome);
    });
  }
}
