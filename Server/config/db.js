const mongoose =require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Database Connected to ${process.env.MONGO_URI}`);
    });

    await mongoose.connect(`${process.env.MONGO_URI}/car-rental`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;