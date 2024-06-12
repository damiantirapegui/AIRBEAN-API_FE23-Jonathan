import { Router } from "express";
import {
  addPromotion,
  getPromotions,
} from "../controllers/promotionController.js";
import { authenticate, authorizedAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/add-promotion", authenticate, authorizedAdmin, addPromotion);
router.get("/get-promotions", getPromotions);

export default router;
