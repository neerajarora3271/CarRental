const mongoose =require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Database Connected to ${process.env.MONGODB_URI}`);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;