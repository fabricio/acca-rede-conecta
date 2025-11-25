import { Router } from "express";
import { ocorrenciaController } from "../controller/ocorrenciaController";
 
const routes = Router();

routes.post("/criar", ocorrenciaController.criar);
routes.get('/', ocorrenciaController.listar);

export default routes;