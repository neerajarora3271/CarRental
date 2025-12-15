
// const protect = async (req, res, next) => {
//     const token = req.headers.authorization;//postman se token pas krenge abhi ke liye http://localhost:7000/api/user/getuserdata
//     if (!token) {
//         res.json({ success: false, message: "Not authorizedd" })
//     }
//     try {
//         const Userid = jwt.verify(token, process.env.JWT_SECRET);
//         if (!Userid) {
//             res.json({ success: false, message: "authorization failed as user not found" });
//         }
//         req.user = await User.findById(Userid.id).select("-password");//token mai "id" ke andr user ki id save h isiliye .id se find krrhe h database ke andr or database mai ' _id 'isse save h ,this line gives all data of user except password

//         next();
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }
// module.exports = {
//     protect,
// };
// middleware/auth.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid user" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
module.exports = {
    protect,
};