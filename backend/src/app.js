import dotenv from "dotenv";
import express from "express";

import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

//route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

export default app;
