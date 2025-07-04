export class ExemplarEntity {
  codigo: number;
  quantidade: number;
  quantidadeEmprestada: number;
  disponivel: boolean;
  livroId: number;

  constructor(
    codigo: number | undefined,
    quantidade: number,
    quantidadeEmprestada: number,
    livroId: number
  ) {
     if (quantidadeEmprestada > quantidade) {
      throw new Error("Quantidade emprestada maior que quantidade no estoque!!!");
    }

    this.codigo = codigo ?? this.gerarCodigo();
    this.quantidade = quantidade;
    this.quantidadeEmprestada = quantidadeEmprestada;
    this.disponivel = quantidade > quantidadeEmprestada;
    this.livroId = livroId;
  }

  private gerarCodigo(): number {
    return parseInt((Date.now() / 100).toString(), 10);
  }
}
