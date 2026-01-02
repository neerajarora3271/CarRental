import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/react-toastify.css";

import { useAppContext } from '../context/AppContext';

const CarCard = () => {

    const navigate = useNavigate();

const {cars}=useAppContext()
    return (
        <div className="p-8">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-900">Featured Vehicles</h1>
                <h3 className="text-lg text-gray-600 mt-2">
                    Explore our selection of premium vehicles available for your next adventure
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10  " >
                {cars.map((car) => (


                    <div
                        key={car._id}
                        className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition cursor-pointer"
                        onClick={() => {
                            if (car.isAvailable) {
                                navigate(`/car-detail/${car._id}`);

                            }
                            toast.error("Car not available!")
                        }}
                    >
                        {/* img div */}

                        <div className="relative">
                            {car.isAvailable ? (
                                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                                    Available Now
                                </span>
                            ) : (
                                <span className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                                    Not Available
                                </span>
                            )}


                            <span className="absolute bottom-2 right-2 bg-black text-white text-sm font-semibold px-3 py-1 rounded-md shadow-md z-10">
                                ₹{car.pricePerDay} / day
                            </span>
                            <img
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        {/* car data */}
                        <div className="mt-4 space-y-2">

                            <h2 className="text-xl font-extrabold">{car.brand} {car.model}</h2>

                            <p className="text-black font-bold">Description: {car.description}</p>

                            <div className="flex items-center gap-2 text-gray-500">
                                <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                                <span>{car.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                                <img src={assets.fuel_icon} alt="fuel" className="w-4 h-4" />
                                <span>{car.fuel_type} • {car.transmission}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-700">
                                <span>Model: {car.model}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={() => {
                        navigate('/cars');

                    }}
                    className=" mx-auto flex items-center justify-center gap-2 px-6 py-2 border-1 hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
                >
                    Explore all cars
                    <img src={assets.arrow_icon} alt="arrow" />
                </button>
            </div>
            <div className="mt-20 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-black">Never Miss a Deal!</h1>
                <h3 className="text-sm md:text-base text-gray-600 mt-2">
                    Subscribe to get the latest offers, new collections, and exclusive discounts.
                </h3>

                <form className="mt-6 flex justify-center">
                    <div className="flex w-full max-w-xl">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </form>
            </div>


            <ToastContainer />
        </div>
    );
};
export default CarCard;
