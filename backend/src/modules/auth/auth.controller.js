import User from "../user/user.model.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const { name, email, password, role } = value;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "already registered",
      });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hasedPassword,
      role,
    });
    return res
      .status(200)
      .json({ success: true, message: "user registered", data: user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `failed to register users${error}`,
    });
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: process.env.COOKIE_EXPIRE,
    });
    return res.status(200).json({
      success: true,
      message: "login successfull",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `failed to login users${error}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "logged out",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `failed to logout users${error}`,
    });
  }
};
