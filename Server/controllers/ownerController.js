const User = require("../models/User")
const Car = require("../models/Car");
const Booking = require("../models/Booking")


const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user; // _id is data of user in original database created  by mongodb automatically,req.user object me se _id naam ka property nikaal lo.
       
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "Now you can List cars" })
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

const AddNewCar = async (req, res) => {
    try {
        const { _id } = req.user; // Logged-in user, req.user object me se _id naam ka property nikaal lo.

        const carData = JSON.parse(req.body.carData); // addCar form data from frontend(addcar.js) converted (object as string coming from frontend )into json as following
        //         {
        //   "brand": "Tata",
        //   "model": "Punch",
        //   "year": 2022,
        //   "pricePerDay": 2800,
        //   "category": "Sedan",
        //   "transmission": "Manual",
        //   "fuel_type": "Petrol",
        //   "seating_capacity": 5,
        //   "location": "Delhi",
        //   "description": "Spacious and comfortable, perfect for long family trips.",
        //   "isAvailable": true
        // }

        const imageUrl = req.file.path; // Cloudinary URL
        console.log("car image from cloudinary \n", imageUrl);
        // Save car to database
        const newCar = await Car.create({
            ...carData,
            owner: _id,  // from headers authorization 
            image: imageUrl  
        });

        res.status(201).json({
            success: true,
            message: "Car added successfully",
            car: newCar,
        });

    } catch (error) {
        console.error("Error in AddNewCar:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add car",
            error: error.message,
        });
    }
};


//api to list owner cars
const getOwnerCars = async (req,res) => {
    try {
        const { _id} = req.user;
        const cars = await Car.find({ owner: _id })//currently login user ne jitni cars rent pr di h vo uska owner h to cars db mai owner mai usi login user ki id hogi ,whi fetch krre h 
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error in getting cars belong to owners" });
    }
}

//api to toggle car availibility to true or false
const toggleCarAvailability = async (req,res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId)

        //checking that the car belong to the user
        if (car.owner.toString() !== _id.toString())//jse koi user ne car add krni h to user ki _id car db mai owner mai jake save hoegi
        {
            return res.json({ success: false, message: "u are not the owner of this car " })
        }
        car.isAvailable = !car.isAvailable,
            await car.save();
        res.json({ success: true, message: "Availabilty toggled" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "availability not toggled" });
    }

}

// api to delete teh car 
const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Check ownership
    if (!car.owner.equals(_id)) {
      return res.json({ success: false, message: "You are not the owner of this car" });
    }

    // Soft delete
    car.isAvailable = false;
    await car.save();

    res.json({ success: true, message: "Car removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Car not removed" });
  }
};


// api to get Dashboard data of owner
const getOwnerDashboardData = async (req,res) => {
    try {
        const user=req.user;
        const { _id} = req.user;
        const {role}=req.user;
      
        if (role !== "owner") {
            return res.json({ success: false, message: "unauthorized" })

        }
        const cars = await Car.find({ owner: _id }); // jo bnda currently login h or agr vo owner h to uski id se jitni cars h vo find krlo 
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });
// array.reduce((accumulator, currentValue) => { ... }, initialValue) syntax of reduce

        const monthlyRevenue = bookings.slice().filter(booking => booking.status == "confirmed").reduce((acc, booking) => acc + booking.price, 0);
        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            recentBookings:bookings.slice(0,3),
            completedBookings: completedBookings.length,
            monthlyRevenue,
            user,

        }
        res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error in fetching dashboard data  " });
    }

}
const updateOwnerImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const UserImage = req.file.path; // Cloudinary URL
        console.log("user image from cloudinary \n", UserImage);
        await User.findByIdAndUpdate(_id, { image: UserImage });
        res.json({ success: true, message: "image updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error in updating user image " });
    }
}
module.exports = {
    changeRoleToOwner,
    AddNewCar,
    getOwnerCars,
    toggleCarAvailability,
    deleteCar,
    getOwnerDashboardData,
    updateOwnerImage,
};