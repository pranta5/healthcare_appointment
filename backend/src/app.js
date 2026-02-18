import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser";

import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import appointmentRouter from "./modules/appointment/appointment.routes.js";
import doctorRouter from "./modules/doctor/doctor.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieparser());
//route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/doctor", doctorRouter);

export default app;
