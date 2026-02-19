import mongoose from "mongoose";
import Appointment from "./appointment.model.js";
import {
  createAppointmentSchema,
  updateStatusSchema,
} from "./appointment.validation.js";
import User from "../user/user.model.js";

export const createAppointment = async (req, res, next) => {
  try {
    const { error, value } = createAppointmentSchema.validate(req.body);
    if (error) {
      return res.status(401).json({
        message: `validation failed ${error.message}`,
      });
    }
    const { doctor, date, time } = value;
    const id = req.user.id;
    const user = await User.findById(doctor);
    if (!user) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!user.isDoctorAvailable) {
      return res.status(401).json({
        success: false,
        message: `doctor is not avilable`,
      });
    }
    const existing = await Appointment.findOne({ doctor, date, time });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `appointment already booked`,
      });
    }
    const appointment = await Appointment.create({
      patient: id,
      doctor,
      date,
      time,
    });
    return res.status(200).json({
      success: true,
      message: `appointment created`,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
export const getMyAppointment = async (req, res, next) => {
  try {
    let appointmentDetails;
    const id = req.user.id;
    if (req.user.role === "patient") {
      appointmentDetails = await Appointment.aggregate([
        { $match: { patient: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "doctor",
            foreignField: "_id",
            as: "doctor_details",
          },
        },
        {
          $unwind: {
            path: "$doctor_details",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            time: 1,
            status: 1,
            doctor_name: "$doctor_details.name",
            doctor_email: "$doctor_details.email",
          },
        },
      ]);
    } else if (req.user.role === "doctor") {
      appointmentDetails = await Appointment.aggregate([
        { $match: { doctor: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "patient",
            foreignField: "_id",
            as: "patient_details",
          },
        },
        {
          $unwind: {
            path: "$patient_details",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            date: 1,
            time: 1,
            status: 1,
            patient_name: "$patient_details.name",
            patient_email: "$patient_details.email",
          },
        },
      ]);
    }
    return res.status(200).json({
      success: true,
      message: `appointment fetched`,
      data: appointmentDetails,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllAppointment = async (req, res, next) => {
  try {
    let pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor_details",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "patient",
          foreignField: "_id",
          as: "patient_details",
        },
      },
      {
        $unwind: {
          path: "$doctor_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$patient_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          time: 1,
          status: 1,
          doctor_name: "$doctor_details.name",
          doctor_email: "$doctor_details.email",
          patient_name: "$patient_details.name",
          patient_email: "$patient_details.email",
        },
      },
    ];

    const appointments = await Appointment.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: `All appointment fetched`,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { error, value } = updateStatusSchema.validate(req.body);
    if (error) {
      return res.status(401).json({
        message: `validation failed ${error.message}`,
      });
    }
    const { status } = value;
    const appointment_id = req.params.id;
    let appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(401).json({
        message: `appointment not found `,
      });
    }
    const userId = req.user.id.toString();
    const isDoctor = appointment.doctor.toString() === userId;
    const isPatient = appointment.patient.toString() === userId;

    if (!isDoctor && !isPatient) {
      return res
        .status(403)
        .json({ success: false, message: "unauthorised to modify status" });
    }
    if (isPatient && req.user.role === "patient") {
      if (appointment.status !== "Pending") {
        return res.status(403).json({
          success: false,
          message: "Only pending appointments can be cancelled",
        });
      }
    }
    appointment.status = status;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: ` appointment status updated`,
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
