import { Router } from "express";
import { usuarioController} from "../controller/usuarioController";

const routes = Router();

routes.post("/criar", usuarioController.criarConta);
routes.post("/login", usuarioController.login);
routes.get("/", usuarioController.listar);

export default routes;
