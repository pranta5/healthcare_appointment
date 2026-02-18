import express from "express";
import { getAllUsers } from "./user.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";
const router = express.Router();

router.get("/all-users", authValidate(["admin"]), getAllUsers);

export default router;
