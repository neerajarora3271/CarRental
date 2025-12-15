const express = require("express");
const { loginUser, Newuser, GetUserData, getCars } = require("../controllers/UserController");
const { protect } = require("../middlewares/auth");
const router = express.Router();


router.post("/register", Newuser);
router.post("/login", loginUser);
router.get("/getuserdata", protect, GetUserData);
router.get("/cars",protect,getCars)

module.exports = router; 
