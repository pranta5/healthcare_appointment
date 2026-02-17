import mongoose from "mongoose";
const MongoUrl = process.env.MONGODB_URL;

const dbconnect = async () => {
  try {
    await mongoose.connect(MongoUrl);
    console.log("db connection successfully");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

export default dbconnect;
