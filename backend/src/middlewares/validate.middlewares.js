import jwt from "jsonwebtoken";

export const authValidate = (allowedRole) => (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "authentication failed",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //only auth check
    if (!allowedRole || allowedRole.length === 0) {
      return next();
    }
    //role check
    if (!allowedRole.includes(decoded.role)) {
      return res.status(403).json({
        message: "access denied",
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      message: "invalid or expired token",
    });
  }
};
