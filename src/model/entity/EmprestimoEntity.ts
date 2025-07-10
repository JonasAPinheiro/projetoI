export class EmprestimoEntity {
  id: number;
  usuarioId: number;
  exemplarId: number;
  dataEmprestimo: Date;
  dataDevolucao: Date;
  dataEntrega: Date | null;
  diasAtraso: number;
  suspensaoAte: Date | null;

  constructor(
    id: number | undefined,
    usuarioId: number,
    exemplarId: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    dataEntrega: Date | null,
    diasAtraso: number,
    suspensaoAte: Date | null
  ) {
    this.id = id ?? 0;
    this.usuarioId = usuarioId;
    this.exemplarId = exemplarId;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
    this.dataEntrega = dataEntrega;
    this.diasAtraso = diasAtraso;
    this.suspensaoAte = suspensaoAte;
  }
}
