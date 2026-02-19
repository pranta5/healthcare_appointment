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

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetched users",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
