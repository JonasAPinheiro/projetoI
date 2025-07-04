import executarComandoSQL from "../database/mysql";
import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository {
  private static instance: UsuarioRepository;

  private constructor() {
    this.createTable();
  }

  static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS projbiblioteca.Usuario(
      id int primary key auto_increment,
      nome varchar(100) not null,
      email varchar(100) not null,
      cpf varchar(11) not null unique,
      ativo enum('ativo', 'inativo', 'suspenso') not null,
      categoriaId int not null,
      cursoId int not null,
      foreign key (categoriaId) references CategoriaUsuario(id),
      foreign key (cursoId) references Curso(id)
    )`;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Tabela Usuário criada com sucesso!!!");
    } catch (err) {
      console.error(`Erro ao executar a query: ${err}`);
    }
  }

  async exibirUsuarios(): Promise<UsuarioEntity[]> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Usuario`, []);

    return resultado.map((linha: any) => {
      return new UsuarioEntity(
        linha.id,
        linha.nome,
        linha.email,
        linha.cpf,
        linha.ativo,
        linha.categoriaId,
        linha.cursoId
      );
    });
  }

  async exibirUsuarioPorCpf(cpf: string): Promise<UsuarioEntity> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Usuario WHERE cpf = ?`, [cpf]);

    const usuario = resultado[0];

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return new UsuarioEntity(
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.cpf,
      usuario.ativo,
      usuario.categoriaId,
      usuario.cursoId
    );
  }

  async exibirUsuarioPorId(id: number): Promise<UsuarioEntity | null> {
    const resultado = await executarComandoSQL(`SELECT * FROM projbiblioteca.Usuario WHERE id = ?`, [id]);

    if (resultado.length == 0) {
      return null;
    }

    const usuario = resultado[0];

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return new UsuarioEntity(
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.cpf,
      usuario.ativo,
      usuario.categoriaId,
      usuario.cursoId
    );
  }

  async insereUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const { nome, email, cpf, ativo, categoriaId, cursoId } = usuario;
    const resultado = await executarComandoSQL(
      `
      INSERT INTO projbiblioteca.Usuario(nome, email, cpf, ativo, categoriaId, cursoId) VALUES(?, ?, ?, ?, ?, ?)
      `,
      [nome, email, cpf, ativo, categoriaId, cursoId]
    );

    const novoUsuario = new UsuarioEntity(resultado.insertId, nome, email, cpf, ativo, categoriaId, cursoId);
    console.log("Usuário inserido com sucesso:", novoUsuario);
    return novoUsuario;
  }

  async atualizaUsuario(cpf: string, novoUsuario: UsuarioEntity): Promise<UsuarioEntity> {
    const { nome, email, ativo, categoriaId, cursoId } = novoUsuario;

    await executarComandoSQL(
      `
      UPDATE projbiblioteca.Usuario SET nome = ?, email = ?, ativo = ?, categoriaId = ?, cursoId = ? WHERE cpf = ?
      `,
      [nome, email, ativo, categoriaId, cursoId, cpf]
    );

    const usuarioAtualizado = await this.exibirUsuarioPorCpf(cpf);
    console.log("Usuário atualizado com sucesso:", usuarioAtualizado);
    return usuarioAtualizado;
  }

  async removeUsuario(cpf: string): Promise<UsuarioEntity> {
    const usuarioExcluido = await this.exibirUsuarioPorCpf(cpf);
    await executarComandoSQL(`DELETE FROM projbiblioteca.Usuario WHERE CPF = ?`, [cpf]);

    console.log("Usuário deletado com sucesso:", usuarioExcluido);
    return usuarioExcluido;
  }
}
