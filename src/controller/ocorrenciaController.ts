import { Request, Response } from "express";
import { ocorrenciaService } from "../services/ocorrenciaService";

class OcorrenciaController {
    async criar(req: Request, res: Response) {
    try {
        const id_usuario = Number(req.body.id_usuario);
        const nova = await ocorrenciaService.criar(id_usuario, req.body);
        res.json(nova); 

          } catch (err: any) {
         return res.status(400).json({ erro: err.message });
          }
        }
     async listarOcorrencia(req: Request, res: Response) {
        const lista = await ocorrenciaService.listar();
        return res.json(lista);
     }
     
     }

     export const ocorrenciaController = new OcorrenciaController();