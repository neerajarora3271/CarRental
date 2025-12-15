const User = require("../models/User");
const Car=require("../models/Car")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Token generator function
const generateToken = (id) => {// token mai sirf database ki generate ki hui id save hori h "id" ke nam se or dataase mai "_id" se svae h by default 
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register new user
const Newuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

  
    const token = generateToken(user._id.toString());
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log("backend",token)
    // Send success response
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const GetUserData=async(req,res)=>{
  try{
const user = req.user; //req.user is get details of user by protect middleware in auth.js
console.log("User in GetUserData ",user)
if(!user){
  res.json({success:false,message:error.message})
}
  res.json({Success:true,user})
  }catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
 

}
const getCars = async (req, res) => {
  try {
    const cars = await Car.find(); // fetch all cars regardless of availability

    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error in fetching cars" });
  }
};

module.exports = {
  Newuser,
  generateToken,
  loginUser,
  GetUserData,
  getCars,
};
