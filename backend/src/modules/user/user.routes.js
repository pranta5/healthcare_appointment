import express from "express";
import { getAllUsers, getSingleUser } from "./user.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";
const router = express.Router();

router.get("/all-users", authValidate(["admin"]), getAllUsers);
router.get("/single-user/:id", getSingleUser);

export default router;
