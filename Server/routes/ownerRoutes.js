const express = require("express");
const { changeRoleToOwner, AddNewCar, getOwnerCars, toggleCarAvailability, deleteCar, getOwnerDashboardData, updateOwnerImage} = require("../controllers/ownerController");
const { protect } = require("../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const {
  carImageStorage,
  userImageStorage,
} = require("../config/cloudConfig");

// Upload for car images
const uploadCarImage = multer({ storage: carImageStorage });

// Upload for user images
const uploadUserImage = multer({ storage: userImageStorage });
// const Car = require("../models/Car");


router.post('/change-role', protect, changeRoleToOwner);
router.post("/add-car",uploadCarImage.single('image'),protect,AddNewCar);


router.get("/getOwnerCars",protect,getOwnerCars);
router.post("/toggle-car",protect,toggleCarAvailability);
router.post("/delete-car",protect,deleteCar);
router.get("/dashboard",protect,getOwnerDashboardData);
router.post("/add-owner-image",protect,uploadUserImage.single('image'),updateOwnerImage);
module.exports = router; 