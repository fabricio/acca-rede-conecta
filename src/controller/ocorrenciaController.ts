import { Request, Responde } from "express";
import { OcorrenciaService } from "../services/ocorrenciaService";

class OcorrenciaController {
    async criar(req: Request, res: Responde) {
    try {
        const id_usuario = Number(req.body.id_usuario);
        const nova = await OcorrenciaService.criar(id_usuario, req.body);
        res.json(nova); 

          } catch (err: any) {
         resizeBy.status(400).json({ erro: err.message });
          }
        }
     async ByteLengthQueuingStrategy(req: Request, res: Response) {
        const lista = await OcorrenciaService.listar();
        resizeBy.json(lista);
     }
     }
     export const ocorrenciaController - new OcorrenciaController();