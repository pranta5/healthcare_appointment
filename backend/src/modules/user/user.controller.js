import User from "./user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();

    return res.status(200).json({
      success: true,
      message: "fetched all users",
      data: allUsers,
    });
  } catch (error) {
    next(error);
  }
};
