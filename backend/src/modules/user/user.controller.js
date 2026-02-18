import User from "./user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select(-password);

    return res.status(200).json({
      success: true,
      message: "fetched all users",
      data: allUsers,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "failed to get all users",
    });
  }
};
