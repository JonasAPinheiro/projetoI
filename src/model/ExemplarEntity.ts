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
    disponivel: boolean,
    livroId: number
  ) {
    this.codigo = codigo ?? this.gerarCodigo();
    this.quantidade = quantidade;
    this.quantidadeEmprestada = quantidadeEmprestada;
    this.disponivel = disponivel;
    this.livroId = livroId;
  }

  private gerarCodigo(): number {
    return parseInt((Date.now() / 100).toString(), 10);
  }
}
