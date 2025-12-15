import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCarsTable = () => {
  const {isOwner,axios}=useAppContext()
  const [Car, SetCar] = useState([]);

  const fetchOwnerCar = async () => {
 try {
  const {data}= await axios.get("/api/owner/getOwnerCars")
  if(data.success){
    SetCar(data.cars)
  }else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
  
 }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCar();
    }
  }, [isOwner]);



  const toggleCarAvailability = async (carId) => {
    console.log(carId)
 try {
  const {data}= await axios.post("/api/owner/toggle-car",{carId})
  if(data.success){
    toast.success(data.message)
    fetchOwnerCar()
  }else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
  
 }
  };

  const deleteCar = async (carId) => {

 try {
  const isConfirmed  =window.confirm("are you sure you want to delete this car?")
  if (!isConfirmed) return; // stop if user cancels
  const {data}= await axios.post("/api/owner/delete-car",{carId})
  if(data.success){
    toast.success(data.message)
    fetchOwnerCar()
  }else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
  
 }
  };









  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-1">Manage Cars</h2>
      <p className="text-gray-500 mb-4">
        View all listed cars, update their details, or remove them from the booking platform
      </p>

      {/* Responsive wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Car</th>
              <th className="p-3">Category</th>
              <th className="p-5">Price</th>
              <th className="p-5">Status</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Car.map((car, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Car Column */}
                <td className="p-3 flex items-center gap-4 min-w-[200px]">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {`${car.brand} ${car.model}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} seats • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3 text-gray-600 text-sm">{car.category}</td>

                {/* Price */}
                <td className="p-3 text-gray-600 text-sm">
                  {car.pricePerDay}/day
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      car.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Not Available"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-2 flex gap-2 items-center">
                  <img onClick={()=>toggleCarAvailability(car._id)}
                   src={car.isAvailable? assets.eye_close_icon : assets.eye_icon}
                    alt="view"
                    className="w-10 h-10 cursor-pointer"
                  />
                  <img onClick={()=>deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt="delete"
                    className="w-10 h-10 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCarsTable;
