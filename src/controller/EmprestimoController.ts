import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

export class EmprestimoController {
  private emprestimoService = new EmprestimoService();

  listarEmprestimos(req: Request, res: Response): void {
    try {
      const emprestimos = this.emprestimoService.exibeEmprestimos();
      res.status(200).json(emprestimos);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os empréstimos!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  cadastrarEmprestimo(req: Request, res: Response): void {
    try {
      const emprestimo = this.emprestimoService.novoEmprestimo(req.body);
      res.status(201).json({
        message: "Empréstimo cadastrado com sucesso!!!",
        emprestimo: emprestimo,
      });
    } catch (error: unknown) {
      let message: string = "Não foi possível cadastrar empréstimo!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  registrarDevolucao(req: Request, res: Response): void {
    try{
      const { id } = req.params;
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
          throw new Error("Id inválido!!!");
      }
      
      const emprestimo = this.emprestimoService.registraDevolucao(idNum, req.body);
      res.status(200).json({
        message: "Devolução registrada com sucesso!!!",
        emprestimo: emprestimo,
      })
    } catch (error: unknown) {
      let message: string = "Não foi possível registrar devolução!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}