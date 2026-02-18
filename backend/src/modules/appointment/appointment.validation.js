import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  doctor: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
});
export const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Approved", "Rejected", "Completed", "Cancelled")
    .required(),
});
