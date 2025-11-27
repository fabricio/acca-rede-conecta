import { Request, Response } from "express"
import { materialService } from "../services/materialService"

class MaterialController {
    async criar(req: Request, res: Response) {
        const id_usuario = Number(req.body.id_usuario);
        const novo = await materialService.criar(id_usuario, req.body);
        res.json(novo);
    } 
    
    async listar(req: Request, res: Response) {
        const lista = await materialService.listar();
    }
}
export const materialController = new MaterialController();
