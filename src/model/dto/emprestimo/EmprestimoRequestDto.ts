export class EmprestimoRequestDto {
  usuarioId: number;
  exemplarId: number;
  dataEmprestimo: Date;

  constructor(usuarioId: number, exemplarId: number, dataEmprestimo: Date) {
    this.usuarioId = usuarioId;
    this.exemplarId = exemplarId;
    this.dataEmprestimo = dataEmprestimo;
  }
}
