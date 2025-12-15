import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { axios, isOwner, } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        console.log("success done in dashboard");
        setData({
          totalCars: data.dashboardData.totalCars || 0,
          totalBookings: data.dashboardData.totalBookings || 0,
          pendingBookings: data.dashboardData.pendingBookings || 0,
          completedBookings: data.dashboardData.completedBookings || 0,
          recentBookings: Array.isArray(data.dashboardData.recentBookings) ? data.dashboardData.recentBookings : [],
          monthlyRevenue: data.dashboardData.monthlyRevenue || 0,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Owner Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 mt-5">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="w-full max-w-[200px] px-5 py-8 shadow rounded bg-white flex flex-row items-center"
          >
            <div>
              <img src={card.icon} alt={card.title} className="w-10 h-10 mb-1" />
            </div>
            <div className="ml-3">
              <h2 className="text-sm font-medium">{card.title}</h2>
              <p className="text-lg font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Monthly Revenue */}
      <div className="grid lg:grid-cols-4 gap-6 mt-10">
        {/* Recent Bookings */}
        <div className="md:col-span-2 sm:col-span-1">
          <div className="p-4 md:p-6 border border-gray-200 rounded-md bg-white">
            <h1 className="text-lg font-medium">Recent Bookings</h1>
            <p className="text-gray-500">Latest customer bookings</p>

            {Array.isArray(data.recentBookings) && data.recentBookings.length > 0 ? (
              data.recentBookings.map((booking, index) => (
                <div key={index} className="mt-4 flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <img src={assets.listIconColored} alt="" className="w-5 h-5" />
                    </div>
                    <div>
                      <p>{booking.car?.brand} {booking.car?.model}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-[120px]">
                    <p className="text-sm font-medium">₹{booking.price}</p>
                    <p className={`text-xs px-2 py-1 rounded-full font-semibold ${booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 mt-4">No recent bookings found.</p>
            )}
          </div>
        </div>

        {/* Monthly Revenue */}
        <div>
          <div className="p-4 md:p-6 border border-gray-300 rounded-md bg-white h-auto">
            <h1 className="text-lg font-medium">Monthly Revenue</h1>
            <p className="text-gray-500 mb-4">Revenue for current month</p>
            <p className="text-5xl font-bold text-blue-600">₹{data.monthlyRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
