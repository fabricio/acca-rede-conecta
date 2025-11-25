import { Request, Responde } from "express"
import { MaterialService } from "../services/materialService"

class MaterialController {
    async criar(req: Request, res: Response) {
    try {
        const id_usuario = Number(req.body.id_usuario);
        const novo = await MaterialService.criar(id_usuario, req.body);
        res.json(novo);
       }
    }
    async listar(req: Request, res: Response) {
        const lista = await MaterialService.listar();

    }
}
export const materialController = new MaterialController();
