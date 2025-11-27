import { Request, Response } from "express";
import { feedbackService } from "../services/feedbackService";

class FeedbackController {
  async criar (req: Request, res: Response) {
    try {
        const id_usuario = Number(req.body.id_usuario);
        const nova = await feedbackService.criar(id_usuario, req.body);
        res.json(nova);
    } catch (err: any){
        res.status(400).json({ erro: err.menssage });
        }
    }
    async listar(req: Request, res: Response) {
        const lista = await feedbackService.listar();
        res.json(lista);
    }
  }

export const feedbackController = new FeedbackController();