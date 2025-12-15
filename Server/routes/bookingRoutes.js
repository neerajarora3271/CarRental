const express = require("express");
const { protect } = require("../middlewares/auth");
const {  checkAvailabiltheofCar, CreateBooking, getUserBookings, getOwnerBookings, changeBookingStatus } = require("../controllers/bookingController");

const router = express.Router();

router.post("/check-availability",checkAvailabiltheofCar);
router.post("/create-booking",protect,CreateBooking);
router.get("/user-bookings",protect,getUserBookings);
router.get("/owner-bookings",protect,getOwnerBookings);

router.post("/change-status",protect,changeBookingStatus);

module.exports=router;
