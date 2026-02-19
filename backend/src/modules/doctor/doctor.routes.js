import express from "express";
import { allDoctor, setAvailability } from "./doctor.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";
import { getAvailableSlot } from "../appointment/appointment.controller.js";

const router = express.Router();

router.get("/all-doctor", allDoctor);

router.patch("/isavailable", authValidate(["doctor"]), setAvailability);

router.get("/slot-available", getAvailableSlot);

export default router;
