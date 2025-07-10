import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

export class EmprestimoController {
  private emprestimoService = new EmprestimoService();

  async listarEmprestimos(req: Request, res: Response): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.exibeEmprestimos();
      res.status(200).json(emprestimos);
    } catch (err: unknown) {
      let message: string = "Não foi possível listar os empréstimos!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async cadastrarEmprestimo(req: Request, res: Response): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.novoEmprestimo(req.body);
      res.status(201).json({
        message: "Empréstimo cadastrado com sucesso!!!",
        emprestimo: emprestimo,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível cadastrar empréstimo!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async registrarDevolucao(req: Request, res: Response): Promise<void> {
    try{
      const { id } = req.params;
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
          throw new Error("Id inválido!!!");
      }
      
      const emprestimo = await this.emprestimoService.registraDevolucao(idNum, req.body);
      res.status(200).json({
        message: "Devolução registrada com sucesso!!!",
        emprestimo: emprestimo,
      })
    } catch (err: unknown) {
      let message: string = "Não foi possível registrar devolução!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}