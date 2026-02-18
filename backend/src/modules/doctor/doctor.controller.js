import mongoose from "mongoose";
import User from "../user/user.model.js";

export const setAvailability = async (req, res) => {
  try {
    const { isDoctorAvailable } = req.body;
    const doctor_id = new mongoose.Types.ObjectId(req.user.id);
    const doctor = await User.findById(doctor_id);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({
        success: false,
        message: ` Doctor not found `,
      });
    }
    doctor.isDoctorAvailable = isDoctorAvailable;
    await doctor.save();
    return res.status(200).json({
      success: true,
      message: ` Availability updatation successfully `,
      data: doctor,
    });
  } catch (error) {
    console.error(`Availability updatation failed ${error}`);

    return res.status(400).json({
      success: false,
      message: ` Availability updatation failed `,
    });
  }
};
