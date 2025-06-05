import { ExemplarEntity } from "../model/ExemplarEntity";

export class ExemplarRepository {
  private static instance: ExemplarRepository;
  private exemplarList: ExemplarEntity[] = [];

  constructor() {}

  static getInstance(): ExemplarRepository {
    if (!this.instance) {
      this.instance = new ExemplarRepository();
    }
    return this.instance;
  }

  exibirExemplares(): ExemplarEntity[] {
    return this.exemplarList;
  }

  exibirExemplarPorCodigo(codigo: number): ExemplarEntity {
    const index = this.findIndex(codigo);
    return this.exemplarList[index];
  }

  insereExemplar(exemplar: ExemplarEntity) {
    this.exemplarList.push(exemplar);
  }

  atualizaExemplar(codigo: number, novoExemplar: ExemplarEntity) {
    const index = this.findIndex(codigo);
    this.exemplarList[index] = novoExemplar;
  }

  removeExemplar(codigo: number) {
    const index = this.findIndex(codigo);
    this.exemplarList.splice(index, 1);
  }

  private findIndex(codigo: number): number {
    const index = this.exemplarList.findIndex((e) => e.codigo == codigo);
    if (index == -1) {
      throw new Error("O código do exemplar não foi encontrado !!!");
    }
    return index;
  }
}
