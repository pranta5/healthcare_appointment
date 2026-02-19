import express from "express";
import {
  getCurrentUser,
  LoginUser,
  logout,
  registerUser,
} from "./auth.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", logout);
router.get("/me", authValidate(), getCurrentUser);

export default router;
