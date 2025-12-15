const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const carSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Sedan", "SUV", "Van"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic", "Semi-Automatic"],
    required: true,
  },
  fuel_type: {
    type: String,
    enum: ["Gas", "Diesel", "Petrol", "Electric", "Hybrid"],
    required: true,
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isAvailable:{
    type: Boolean,
    default: true,
  }
}, { timestamps: true });


const Car = mongoose.model("Car", carSchema);

module.exports = Car;