const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

const userRoute = require("./routes/UserRoutes");
const OwnerRoute = require("./routes/ownerRoutes");
const bookingRoute = require("./routes/bookingRoutes");

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRoute);
app.use("/api/owner", OwnerRoute);
app.use("/api/bookings", bookingRoute);

//  ONLY listen locally
if (process.env.NODE_ENV !== "production") {
  const PORT = 7000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = app;
