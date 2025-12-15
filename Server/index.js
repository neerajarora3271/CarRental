const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const PORT =7000;
dotenv.config();
const app = express();
const userRoute=require("./routes/UserRoutes")
const OwnerRoute =require("./routes/ownerRoutes")
const bookingRoute=require("./routes/bookingRoutes")


//middleware
app.use(cors());
app.use(express.json());
 connectDB();

app.get("/",(req,res)=>{
    res.send("server is running")
});
app.use("/api/user",userRoute);
app.use("/api/owner",OwnerRoute);
app.use("/api/bookings",bookingRoute)

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`));