import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [Bookings, setBookings] = useState([]);
  const { axios, user } = useAppContext()

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user-bookings')
      if (data.success) {
        setBookings(data.Bookings)
      } else {
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e.message)
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <div className="px-6 md:px-20 py-10">
      <h2 className="text-2xl font-semibold mb-2">My Bookings</h2>
      <p className="text-gray-500 mb-6">View and manage your car bookings</p>

      <div className="space-y-5">
        {Bookings.map((booking, index) => (

          <div //outer div

            key={booking._id}
            className="bg-white rounded-2xl shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-600"
          >

            <div className="flex md:flex-row md:items-center gap-5" >
              {/* inner div */}
              <div className="w-full md:w-60 h-40 overflow-hidden">
                <img
                  src={booking.car.image}
                  alt={booking.car.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>


              {/* Booking Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">Booking #{index + 1}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-sm">
                  <strong>Rental Period:</strong>{" "}
                  {new Date(booking.pickupDate).toLocaleDateString()} -{" "}{new Date(booking.returnDate).toLocaleDateString()}
                </p>

                <p className="text-sm">
                  <strong>Pick-up Location:</strong> {booking.car.location}

                </p>
                <p className="text-sm">
                  <strong>Owner:</strong> {booking.car.owner.name}  •  {booking.car.owner.email}

                </p>


                <p className="text-gray-500 text-sm">{booking.car.category}</p>
              </div>

              {/* Price Summary */}
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">₹{booking.price}</p>
                <p className="text-xs text-gray-500">
                  Booked on{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
