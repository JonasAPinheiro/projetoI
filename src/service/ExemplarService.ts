import { ExemplarEntity } from "../model/ExemplarEntity";
import { ExemplarRepository } from "../repository/ExemplarRepository";

export class ExemplarService {
  private exemplarRepository = ExemplarRepository.getInstance();

  exibeExemplares(): ExemplarEntity[] {
    return this.exemplarRepository.exibirExemplares();
  }

  exibeExemplarPorCodigo(codigo: number): ExemplarEntity{
    return this.exemplarRepository.exibirExemplarPorCodigo(codigo);
  }

  novoExemplar(data: any): ExemplarEntity {
    if(!data.quantidade || !data.quantidadeEmprestada || data.disponivel == undefined || !data.livroId) {
      throw new Error("Preencha todos os campos !!!");
    }
    const exemplar = new ExemplarEntity(undefined, data.quantidade, data.quantidadeEmprestada, data.disponivel, data.livroId);

    this.exemplarRepository.insereExemplar(exemplar);
    return exemplar;
  }

  atualizaExemplar(codigo: number, data: any): ExemplarEntity {
    const exemplarAtual = this.exemplarRepository.exibirExemplarPorCodigo(codigo);
    if(!data.quantidade || !data.quantidadeEmprestada || data.disponivel == undefined || !data.livroId) {
      throw new Error("Preencha todos os campos !!!");
    }

    const novoExemplar = new ExemplarEntity(exemplarAtual.codigo, data.quantidade, data.quantidadeEmprestada, data.disponivel, data.livroId);

    this.exemplarRepository.atualizaExemplar(codigo, novoExemplar);

    return novoExemplar
  }

  removeExemplar(codigo: number) {
    this.exemplarRepository.removeExemplar(codigo);
  }
}