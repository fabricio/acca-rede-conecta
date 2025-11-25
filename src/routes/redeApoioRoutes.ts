import { Router } from "express";
import { RedeApoioController } from "../controllers/redeApoioController";

const router = Router();

router.post("/criar", RedeApoioController.criar);
router.get("/", RedeApoioController.listar);
export default router;