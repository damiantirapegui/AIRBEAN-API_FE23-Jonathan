// This route is for menu handling for Admin

import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProductFromMenu,
} from "../controllers/menuController.js";
import { authenticate, authorizedAdmin } from "../middleware/auth.js";

const router = Router();

// Rout to add a new product to the menu
router.post("/add-product", authenticate, authorizedAdmin, addProduct);
router.put("/update-product/:id", authenticate, authorizedAdmin, updateProduct);
router.delete(
  "/delete-product/:id",
  authenticate,
  authorizedAdmin,
  deleteProductFromMenu
);

export default router;
