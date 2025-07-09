import { Request, Response } from "express";
import { ExemplarService } from "../service/ExemplarService";

export class ExemplarController {
  private exemplarService = new ExemplarService();

  async listarExemplares(req: Request, res: Response): Promise<void> {
    try {
      const exemplares = await this.exemplarService.exibeExemplares();
      res.status(200).json(exemplares);
    } catch (err: unknown) {
      let message: string = "Não foi possível listar os exemplares!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async listarExemplarPorCodigo(req: Request, res: Response): Promise<void> {
    try {
      const { codigo } = req.params;
      const codigoNum = parseInt(codigo);
      const exemplar = await this.exemplarService.exibeExemplarPorCodigo(codigoNum);

      if (isNaN(codigoNum)) {
        throw new Error("Código inválido!");
      }

      res.status(200).json(exemplar);
    } catch (err: unknown) {
      let message: string = "Não foi possível encontrar o exemplar com esse código!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async cadastrarExemplar(req: Request, res: Response): Promise<void> {
    try {
      const exemplar = await this.exemplarService.novoExemplar(req.body);

      res.status(201).json({
        message: "Exemplar cadastrado com sucesso!!!",
        exemplar: exemplar,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível cadastrar exemplar!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async atualizarExemplar(req: Request, res: Response): Promise<void> {
    try {
      const { codigo } = req.params;
      const codigoNum = parseInt(codigo);
      const exemplar = await this.exemplarService.atualizaExemplar(codigoNum, req.body);

      if (isNaN(codigoNum)) {
        throw new Error("Código inválido!");
      }

      res.status(200).json({
        message: "Exemplar atualizado com sucesso!!!",
        exemplar: exemplar,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível ataualizar exemplar!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async removerExemplar(req: Request, res: Response): Promise<void> {
    try {
      const { codigo } = req.params;
      const codigoNum = parseInt(codigo);

      if (isNaN(codigoNum)) {
        throw new Error("Código inválido!");
      }

      const exemplar = await this.exemplarService.exibeExemplarPorCodigo(codigoNum);

      await this.exemplarService.removeExemplar(codigoNum);
      res.status(200).json({
        message: "Exemplar removido com sucesso!!!",
        exemplar: exemplar,
      });
    } catch (err: unknown) {
      let message: string = "Não foi possível remover exemplar!!!";
      if (err instanceof Error) {
        message = err.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}
