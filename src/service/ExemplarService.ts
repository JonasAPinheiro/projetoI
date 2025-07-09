import { ExemplarEntity } from "../model/ExemplarEntity";
import { ExemplarRepository } from "../repository/ExemplarRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class ExemplarService {
  private exemplarRepository = ExemplarRepository.getInstance();
  private livroRepository = LivroRepository.getInstance();

  async exibeExemplares(): Promise<ExemplarEntity[]> {
    return await this.exemplarRepository.exibirExemplares();
  }

  async exibeExemplarPorCodigo(codigo: number): Promise<ExemplarEntity> {
    return this.exemplarRepository.exibirExemplarPorCodigo(codigo);
  }

  async novoExemplar(data: any): Promise<ExemplarEntity> {
    if (data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
      throw new Error("Preencha todos os campos !!!");
    }

    const livro = await this.livroRepository.exibirLivroPorId(data.livroId);

    if (!livro) {
      throw new Error("Livro não encontrado!!!");
    }

    const exemplar = new ExemplarEntity(
      undefined, 
      undefined, 
      data.quantidade, 
      data.quantidadeEmprestada, 
      data.livroId
    );

    return await this.exemplarRepository.insereExemplar(exemplar);
  }

  async atualizaExemplar(codigo: number, data: any): Promise<ExemplarEntity> {
    const exemplarAtual = await this.exemplarRepository.exibirExemplarPorCodigo(codigo);

    if (data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
      throw new Error("Preencha todos os campos !!!");
    }

    const livro = await this.livroRepository.exibirLivroPorId(data.livroId);

    if (!livro) {
      throw new Error("Livro não encontrado!!!");
    }

    const novoExemplar = new ExemplarEntity(
      exemplarAtual.id,
      exemplarAtual.codigo,
      data.quantidade,
      data.quantidadeEmprestada,
      data.livroId
    );

    return await this.exemplarRepository.atualizaExemplar(codigo, novoExemplar);
  }

  async removeExemplar(codigo: number): Promise<ExemplarEntity> {
    return await this.exemplarRepository.removeExemplar(codigo);
  }
}
