import express from "express";
import {
  createAppointment,
  getAllAppointment,
  getMyAppointment,
  updateAppointmentStatus,
} from "./appointment.controller.js";
import { authValidate } from "../../middlewares/validate.middlewares.js";
const router = express.Router();

router.post("/create", authValidate(), createAppointment);
router.get("/my-appointment", authValidate(), getMyAppointment);
router.get("/all-appointment", authValidate(["admin"]), getAllAppointment);
router.patch(
  "/:id/status",
  authValidate(["doctor", "patient"]),
  updateAppointmentStatus,
);

export default router;
