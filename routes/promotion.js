import { Router } from "express";
import { addPromotion } from "../controllers/promotionController.js";
import { authenticate, authorizedAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/add-promotion", authenticate, authorizedAdmin, addPromotion);

export default router;
