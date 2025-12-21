const mongoose = require("mongoose");
const { log, error } = require("../utils/logger");

mongoose.set('bufferCommands',false)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {dbName: "raj_enterprise", serverSelectionTimeoutMS:50000});
    log("MongoDB Connected Successfully");
  } catch (error) {
    error("MongoDB Connection Failed:", error.reason);
    process.exit(1);
  }
};

module.exports = connectDB;
