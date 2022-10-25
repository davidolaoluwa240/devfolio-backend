// Modules
import mongoose from "mongoose";

/**
 * Connect To Mongodb Database
 * @param {function} cb Callback function to be called when database is connected
 */
const connectDB = async (cb) => {
  try {
    const connection = await mongoose.connect(process.env.LOCALDATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    cb(connection.connections);
  } catch (err) {
    console.log(`ERROR 💥💥: An error Occur while connecting to database`);
  }
};

module.exports = connectDB;
