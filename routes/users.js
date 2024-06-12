import { Router } from "express";
import {
  createUser,
  login,
  logout,
  loginAdmin,
  logoutAdmin,
} from "../controllers/usersController.js";

import { authorizedAdmin } from "../middleware/auth.js";

const router = Router();

// Log in user
router.post("/login", login);

// Create user
router.post("/signup", createUser);

// Log out user
router.post("/logout", logout);

router.post("/login-admin", loginAdmin);

router.post("/logout-admin", logoutAdmin);

// router.post("/logout-admin" logoutAdmin )

export default router;
