import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const AddCarForm = () => {
  const { axios } = useAppContext();
  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 2025,
    pricePerDay: 100,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  });
  const [isLoading, setisLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null
    setisLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))
      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 2025,
          pricePerDay: 100,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)


    }finally{
      setisLoading(false)
    }
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("carData", JSON.stringify(car));  yh line car state mai save data(object) ko string  mai convert krke backend pe jaegi 
    //   "car:{
    //   \"brand\":\"Hyundai\",
    //   \"model\":\"Creta\",
    //   \"year\":2023,
    //   \"pricePerDay\":2500,
    //   \"category\":\"SUV\",
    //   \"transmission\":\"Automatic\",
    //   \"fuel_type\":\"Petrol\",
    //   \"seating_capacity\":5,
    //   \"location\":\"Delhi\",
    //   \"description\":\"Smooth ride, well maintained\"
    // }"or frr backend isko json mai parse krega (owner controller->addnewcar)
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white mt-6 sm:mt-10 rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Add New Car</h2>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Fill in details to list a new car for booking, including pricing, availability, and car specifications.
      </p>

      <form className="space-y-8" onSubmit={onSubmitHandler}>
        {/* Upload Image */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="upload icon"
              className="h-28 w-32 object-cover rounded-md border"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>

        {/* Brand and Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              className="w-full border rounded-md p-2"
              onChange={e => setCar({ ...car, brand: e.target.value })}
              value={car.brand}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, Model S..."
              className="w-full border rounded-md p-2"
              onChange={e => setCar({ ...car, model: e.target.value })}
              value={car.model}
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="text"
              placeholder="2025"
              className="w-full border rounded-md p-2"
              onChange={e => setCar({ ...car, year: e.target.value })}
              value={car.year}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Daily Price (₹)</label>
            <input
              type="text"
              placeholder="100"
              className="w-full border rounded-md p-2"
              value={car.pricePerDay}
              onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Seating Capacity</label>
            <input
              type="number"
              placeholder="5"
              className="w-full border rounded-md p-2"
              value={car.seating_capacity}
              onChange={e => setCar({ ...car, seating_capacity: e.target.value })}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Location</option>
            {/* <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option> */}
            <option value="Delhi">Delhi</option>
            <option value="Lucknow">Lucknow, Uttar Pradesh</option>
            <option value="Kanpur">Kanpur, Uttar Pradesh</option>
            <option value="Jaipur">Jaipur, Rajasthan</option>
            <option value="Jodhpur">Jodhpur, Rajasthan</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Amritsar">Amritsar, Punjab</option>
            <option value="Dehradun">Dehradun, Uttarakhand</option>
            <option value="Shimla">Shimla, Himachal Pradesh</option>
            <option value="Patna">Patna, Bihar</option>
            <option value="YamunaNagar">Yamunanagar</option>

          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="Describe your car, its condition, and any notable details..."
            className="w-full border rounded-md p-2 h-24"
            value={car.description}
            onChange={e => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex gap-5 w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          <img src={assets.tick_icon} alt="tick" />
         {isLoading ? "Listing....": "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
