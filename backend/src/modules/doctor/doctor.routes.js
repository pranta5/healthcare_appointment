import express from "express";
import {
  allDoctor,
  setAvailability,
  setRoleDoctor,
} from "./doctor.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";
import { getAvailableSlot } from "../appointment/appointment.controller.js";

const router = express.Router();

router.get("/all-doctor", allDoctor);

router.patch("/isavailable", authValidate(["doctor"]), setAvailability);

router.get("/slot-available", getAvailableSlot);
router.patch("/role/:id", authValidate("admin"), setRoleDoctor);

export default router;
