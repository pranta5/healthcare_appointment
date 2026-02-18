import express from "express";
import { setAvailability } from "./doctor.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";

const router = express.Router();

router.patch("/available", authValidate(["doctor"]), setAvailability);

export default router;
