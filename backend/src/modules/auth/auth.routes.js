import express from "express";
import { LoginUser, logout, registerUser } from "./auth.controller.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.post("/logout", logout);

export default router;
