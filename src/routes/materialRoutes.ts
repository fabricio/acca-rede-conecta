import { Router } from "express";
import { materialController } from "../controller/materialController";

const routes = Router();

routes.post("/criar", materialController.criar);
routes.get("/", materialController.listar);

export default routes;
