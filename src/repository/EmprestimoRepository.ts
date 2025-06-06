import { EmprestimoEntity } from "../model/EmprestimoEntity";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;
  private emprestimoList: EmprestimoEntity[] = [];

  constructor() {}

  static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  exibirEmprestimos(): EmprestimoEntity[]{
    return this.emprestimoList;
  }

  exibirEmprestimoPorId(id: number): EmprestimoEntity {
    const index = this.findIndex(id);
    return this.emprestimoList[index];
  }

  insereEmprestimo(emprestimo: EmprestimoEntity) {
    this.emprestimoList.push(emprestimo);
  }

  atualizaEmprestimo(id: number, novoEmprestimo: EmprestimoEntity): void {
    const index = this.findIndex(id);
    this.emprestimoList[index] = novoEmprestimo;
  }

  private findIndex(id: number): number {
    const index = this.emprestimoList.findIndex((e) => e.id == id);
    if (index == -1) {
      throw new Error("O id do empréstimo não foi encontrado!!!");
    }
    return index;
  }
}