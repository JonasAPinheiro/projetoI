export class ExemplarRequestDto {
  quantidade: number;
  quantidadeEmprestada: number;
  livroId: number;

  constructor(
    quantidade: number,
    quantidadeEmprestada: number,
    livroId: number
  ) {

    this.quantidade = quantidade;
    this.quantidadeEmprestada = quantidadeEmprestada;
    this.livroId = livroId;
  }
}
