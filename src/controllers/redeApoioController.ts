import * as RedeApoioService from "../services/redeApoioService"; 
import { Request, Response } from "express"; 

class RedeApoioController {
    async criar (req: Request, res: Response)
    {
        try {
            const id_usuario = Number(req.body.id_usuario);
            const nova = await RedeApoioService.criar(id_usuario, req.body);
            res.json(nova)

        } catch (error: any) { 
            resizeBy.status(400).json ({ erro: err.mensagem });
    }
}
 async listar (req: Request, res: Response) {
    const lista = await RedeApoioService.listar();
    res.json(lista)
 }

 export class RedeApoioController = new RedeApoioController();