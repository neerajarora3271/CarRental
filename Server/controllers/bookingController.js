const Booking = require("../models/Booking")
const Car = require("../models/Car");

// function  to check availiabilty of car for a given date
const checkAvailabilty = async (carId, pickupDate, returnDate) => {
  // 1. First, check the car's availability status in the DB
  const car = await Car.findById(carId);
  if (!car || car.isAvailable === false) {
    return false; // If car is not found or not available at all
  }

  // 2. Then, check for any conflicting bookings
   const bookings = await Booking.find({
    car: carId,
      status: { $nin: ["cancelled", "pending"] }, //  Ignore cancelled and pending
//check only confirm bookings ,kyuki agr booking pending h or cancel h to usse koi b book kr skta h jb tk owner confirm na krde
 
    pickupDate: { $lte: new Date(returnDate) },
    returnDate: { $gte: new Date(pickupDate) },
  });

  // 3. Return true only if no conflicting bookings exist
  return bookings.length === 0;
};

// api to  check availiabilty of car for a given date and location
const checkAvailabiltheofCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const cars = await Car.find({ location });

    const carAvailabilityChecks = cars.map(async (car) => {
      const isAvailable = await checkAvailabilty(car._id, pickupDate, returnDate);
      return {
        ...car._doc,
        isAvailable,
      };
    });

    const allCarsWithAvailability = await Promise.all(carAvailabilityChecks);

    res.json({ success: true, availableCars: allCarsWithAvailability });

  } catch (error) {
    console.log("Error checking car availability:", error.message);
    res.status(500).json({ success: false, message: "Server error checking availability" });
  }
};

//api to create booking

const CreateBooking = async (req,res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;
         const cars = await Car.find({ car });
        const isAvailable = await checkAvailabilty(car, pickupDate, returnDate)
        if (!isAvailable) {
            return res.json({ success: false, message: "car is already booked in entered time period" })
        }
        const carData = await Car.findById(car)
        //calculate price based on pickupdate and return date 
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfdays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noOfdays;

        await Booking.create({ car, owner: carData.owner, user: _id, pickupDate, returnDate, price });
        res.json({ success: true, message: "booking of car done successfuly" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error in booking  cars" });
    }
}


// api to list user bookings 
const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;

   const bookings = await Booking.find({ user: _id })
      .populate({
        path: "car",
        populate: {
          path: "owner",         
          select: "name email",  
        },
      })
      .sort({ createdAt: -1 });
        if (bookings.length === 0) {
            return res.json({ success: false, message: "You have no bookings yet" });
        }

        res.json({ success: true, Bookings: bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Error in fetching user booking" });
    }
};



// api to get owner bookings 
const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
        //db.bookings.find({ owner: "68866cc4b43e0256bdcdb0af" })it is  id(currently login user id ) ,Show all bookings where the car belongs to login user, no matter who booked it.or us bnde ki sari bookings cars details or user ki info fetch krra h jisne car book kri

        if (bookings.length === 0) {
            return res.json({ success: false, message: "there are No bookings yet" });
        }
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "error in fetching owner bookings" });
    }
};


// api to change booking status 
const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

      
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized to change booking status" });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error in changing booking status" });
    }
};

module.exports = {
    checkAvailabilty,
    checkAvailabiltheofCar,
    CreateBooking,
    getOwnerBookings,
    getUserBookings,
    changeBookingStatus,
}