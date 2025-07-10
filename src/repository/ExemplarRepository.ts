import executarComandoSQL from "../database/mysql";
import { ExemplarEntity } from "../model/entity/ExemplarEntity";

export class ExemplarRepository {
  private static instance: ExemplarRepository;

  constructor() {}

  async init() {
    await this.createTable();
  }

  static getInstance(): ExemplarRepository {
    if (!this.instance) {
      this.instance = new ExemplarRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.Exemplar(
      id int primary key auto_increment,
      codigo bigint not null unique,
      quantidade int not null,
      quantidadeEmprestada int not null,
      disponivel boolean not null, 
      livroId int not null,
      foreign key (livroId) references Livro(id)
    )`;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Tabela Exemplar criada com sucesso!!!");
    } catch (err) {
      console.error("Erro ao executar a query: ", err);
    }
  }

  async exibirExemplares(): Promise<ExemplarEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Exemplar`, []);

    return resultado.map((linha: any) => {
      return new ExemplarEntity(linha.id, linha.codigo, linha.quantidade, linha.quantidadeEmprestada, linha.livroId);
    });
  }

  async exibirExemplarPorCodigo(codigo: number): Promise<ExemplarEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Exemplar WHERE codigo = ?`, [codigo]);

    const exemplar = resultado[0];

    if (!exemplar) {
      throw new Error("Exemplar não encontrado");
    }

    return new ExemplarEntity(
      exemplar.id,
      exemplar.codigo,
      exemplar.quantidade,
      exemplar.quantidadeEmprestada,
      exemplar.livroId
    );
  }

  async exibirExemplarPorId(id: number): Promise<ExemplarEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Exemplar WHERE id = ?`, [id]);

    const exemplar = resultado[0];

    if (!exemplar) {
      throw new Error("Exemplar não encontrado");
    }

    return new ExemplarEntity(
      exemplar.id,
      exemplar.codigo,
      exemplar.quantidade,
      exemplar.quantidadeEmprestada,
      exemplar.livroId
    );
  }

  async insereExemplar(exemplar: ExemplarEntity): Promise<ExemplarEntity> {
    const { codigo, quantidade, quantidadeEmprestada, disponivel, livroId } = exemplar;

    const resultado = await executarComandoSQL(
      `
      INSERT INTO projbiblioteca.Exemplar(codigo, quantidade, quantidadeEmprestada, disponivel, livroId) VALUES(?, ?, ?, ?, ?)
      `,
      [codigo, quantidade, quantidadeEmprestada, disponivel, livroId]
    );

    const novoExemplar = new ExemplarEntity(resultado.insertId, codigo, quantidade, quantidadeEmprestada, livroId);
    console.log("Exemplar inserido com sucesso:", novoExemplar);
    return novoExemplar;
  }

  async atualizaExemplar(codigo: number, novoExemplar: ExemplarEntity): Promise<ExemplarEntity> {
    const { quantidade, quantidadeEmprestada, disponivel, livroId } = novoExemplar;

    await executarComandoSQL(
      `
      UPDATE projbiblioteca.Exemplar SET quantidade = ?, quantidadeEmprestada = ?, disponivel = ?, livroId = ? WHERE codigo = ?
      `,
      [quantidade, quantidadeEmprestada, disponivel, livroId, codigo]
    );

    const exemplarAtualizado = await this.exibirExemplarPorCodigo(codigo);
    console.log("Exemplar atualizado com sucesso:", exemplarAtualizado);
    return exemplarAtualizado;
  }

  async removeExemplar(codigo: number): Promise<ExemplarEntity> {
    const exemplarExcluido = await this.exibirExemplarPorCodigo(codigo);
    await executarComandoSQL(`DELETE FROM projbiblioteca.Exemplar WHERE codigo = ?`, [codigo]);

    console.log("Exemplar deletado com sucesso:", exemplarExcluido);
    return exemplarExcluido;
  }
}
