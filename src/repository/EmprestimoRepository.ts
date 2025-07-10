import executarComandoSQL from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;

  constructor() {
    this.createTable();
  }

  static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.Emprestimo(
      id int primary key auto_increment,
      dataEmprestimo date not null,
      dataDevolucao date not null,
      dataEntrega date,
      diasAtraso int not null,
      suspensaoAte date,
      usuarioId int not null,
      exemplarId int not null,
      foreign key (usuarioId) references Usuario(id),
      foreign key (exemplarId) references Exemplar(id)
    ) `;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Tabela Emprestimo criada com sucesso!!!");
    } catch (err) {
      console.error("Erro ao executar a quary: ", err);
    }
  }

  async exibirEmprestimos(): Promise<EmprestimoEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Emprestimo`, []);

    return resultado.map((linha: any) => {
      return new EmprestimoEntity(
        linha.id,
        linha.usuarioId,
        linha.exemplarId,
        linha.dataEmprestimo,
        linha.dataDevolucao,
        linha.dataEntrega,
        linha.diasAtraso,
        linha.suspensaoAte
      );
    });
  }

  async exibirEmprestimoPorId(id: number): Promise<EmprestimoEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Emprestimo WHERE id = ?`, [id]);

    const emprestimo = resultado[0];

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado");
    }

    return new EmprestimoEntity(
      emprestimo.id,
      emprestimo.usuarioId,
      emprestimo.exemplarId,
      emprestimo.dataEmprestimo,
      emprestimo.dataDevolucao,
      emprestimo.dataEntrega,
      emprestimo.diasAtraso,
      emprestimo.suspensaoAte
    );
  }

  async insereEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
    const { dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte, usuarioId, exemplarId } = emprestimo;

    const resultado = await executarComandoSQL(
      `
      INSERT INTO projbiblioteca.Emprestimo( dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte, usuarioId, exemplarId) VALUES(?, ?, ?, ?, ?, ?, ?)
      `,
      [dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte, usuarioId, exemplarId]
    );

    const novoEmprestimo = new EmprestimoEntity(
      resultado.insertId,
      usuarioId,
      exemplarId,
      dataEmprestimo,
      dataDevolucao,
      dataEntrega,
      diasAtraso,
      suspensaoAte
    );
    console.log("Emprestimo inserido com sucesso:", novoEmprestimo);
    return novoEmprestimo;
  }

  async atualizaEmprestimo(id: number, novoEmprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
    const { dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte, usuarioId, exemplarId } =
      novoEmprestimo;

    await executarComandoSQL(
      `
      UPDATE projbiblioteca.Emprestimo SET dataEmprestimo = ?, dataDevolucao = ?, dataEntrega = ?, diasAtraso = ?, suspensaoAte = ?, usuarioId = ?, exemplarId = ? WHERE id = ?
      `,
      [dataEmprestimo, dataDevolucao, dataEntrega, diasAtraso, suspensaoAte, usuarioId, exemplarId, id]
    );

    const emprestimoAtualizado = await this.exibirEmprestimoPorId(id);
    console.log("Empréstimo atualizado com sucesso:", emprestimoAtualizado);
    return emprestimoAtualizado;
  }
}
