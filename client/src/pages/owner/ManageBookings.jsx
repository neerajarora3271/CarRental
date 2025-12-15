import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const { axios, isOwner } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner-bookings");
      data.success ? setBookings(data.bookings) : toast.error(data.message);
      console.log("5155151",data.bookings);

    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerBookings();
    }
  }, [isOwner]);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-2">Manage Bookings</h1>
      <p className="text-gray-600 mb-4 md:mb-6">
        Track all customer bookings, approve or cancel requests, and manage booking statuses.
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="p-3 whitespace-nowrap">Car</th>
              <th className="p-3 whitespace-nowrap">Date Range</th>
              <th className="p-3 whitespace-nowrap">Customer</th>
              <th className="p-3 whitespace-nowrap">Total</th>
              <th className="p-3 whitespace-nowrap">Payment</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                {/* Car Info */}
                <td className="flex items-center gap-2 p-3 whitespace-nowrap max-sm:flex-col max-sm:items-start max-sm:gap-1">
                  <img
                    src={booking.car.image}
                    alt="car"
                    className="w-16 h-12 rounded object-cover"
                  />
                  <span className="font-medium">{booking.car.brand} {booking.car.model}</span>
                </td>

                {/* Date Range */}
                <td className="p-3 whitespace-nowrap text-sm text-gray-700">
                  {new Date(booking.pickupDate).toLocaleDateString()} <br className="sm:hidden" />
                  <span className="text-gray-400">to</span>{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </td>

                {/* Customer Info */}
                <td className="p-3 whitespace-nowrap text-sm">
                  <span className="font-medium">{booking.user.name}</span>
                  <br />
                  <span className="text-gray-500 text-xs">{booking.user.email}</span>
                </td>

                {/* Price */}
                <td className="p-3 whitespace-nowrap font-semibold text-gray-800">
                  ₹{booking.price}
                </td>

                {/* Payment (Static) */}
                <td className="p-3 whitespace-nowrap">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Offline</span>
                </td>

                {/* Booking Status */}
                <td className="p-3 whitespace-nowrap">
                  {booking.status === "pending" ? (
                    <select
                      onChange={(e) =>
                        changeBookingStatus(booking._id, e.target.value)
                      }
                      value={booking.status}
                      className="px-3 py-1.5 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
