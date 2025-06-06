import { ExemplarEntity } from "../model/ExemplarEntity";
import { ExemplarRepository } from "../repository/ExemplarRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class ExemplarService {
  private exemplarRepository = ExemplarRepository.getInstance();
  private livroRepository = LivroRepository.getInstance();

  exibeExemplares(): ExemplarEntity[] {
    return this.exemplarRepository.exibirExemplares();
  }

  exibeExemplarPorCodigo(codigo: number): ExemplarEntity{
    return this.exemplarRepository.exibirExemplarPorCodigo(codigo);
  }

  novoExemplar(data: any): ExemplarEntity {
    if(data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
      throw new Error("Preencha todos os campos !!!");
    }

    const livro = this.livroRepository.exibirLivroPorId(data.livroId);
    if (!livro) {
      throw new Error("Livro não encontrado!!!");
    }

    if (data.quantidadeEmprestada > data.quantidade) {
      throw new Error("Quantidade emprestada maior que quantidade no estoque!!!");
    }

    const disponivel = data.quantidade > data.quantidadeEmprestada;

    const exemplar = new ExemplarEntity(undefined, data.quantidade, data.quantidadeEmprestada, disponivel, data.livroId);

    this.exemplarRepository.insereExemplar(exemplar);
    return exemplar;
  }

  atualizaExemplar(codigo: number, data: any): ExemplarEntity {
    const exemplarAtual = this.exemplarRepository.exibirExemplarPorCodigo(codigo);
    if (data.quantidade == undefined || data.quantidadeEmprestada == undefined || !data.livroId) {
    throw new Error("Preencha todos os campos !!!");
  }

    const livro = this.livroRepository.exibirLivroPorId(data.livroId);
    if (!livro) {
      throw new Error("Livro não encontrado!!!");
    }

    const novoExemplar = new ExemplarEntity(exemplarAtual.codigo, data.quantidade, data.quantidadeEmprestada, data.disponivel, data.livroId);

    this.exemplarRepository.atualizaExemplar(codigo, novoExemplar);

    return novoExemplar
  }

  removeExemplar(codigo: number) {
    this.exemplarRepository.removeExemplar(codigo);
  }
}