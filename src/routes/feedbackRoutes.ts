import { Router } from "express";
import { feedbackController } from "../controller/feedbackController";

const routes =  Router();

routes.post("/criar", feedbackController.criar);
routes.get("/", feedbackController.listar);

export default routes ;
