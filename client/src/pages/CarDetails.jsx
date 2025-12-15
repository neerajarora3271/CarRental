import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loading from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
const {cars,axios,pickupDate,setPickupDate,returnDate,setReturnDate}=useAppContext()
console.log(pickupDate,returnDate)
  const car = cars.find((car) => car._id === id);
 
  if (!car) return <div>Car not found</div>;
const handleSubmit = async(e)=>{
 
e.preventDefault(); 
try {
  const {data}=await axios.post('/api/bookings/create-booking',{
    car:id,pickupDate,
    returnDate
  })
  if(data.success){
    toast.success(data.message)
    navigate('/my-bookings')
  }else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
  
}
}
  return car ? (
    <div className="px-6 md:px-16 lg:ox-24 xl:px-32 mt-16 mb-18">
      <button onClick={() => navigate("/cars")} className='flex items-center justify-center gap-2 px-8 py-2  rounded-md relative  right-8 cursor-pointer'>
        <img src={assets.arrow_icon} className='rotate-180 ' />Back To all cars
      </button>


      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* car image and details  left side*/}
        <div className='lg:col-span-2'>
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto md:h-96 object-cover rounded-xl mb-6 md:max-h-100"
          />

          {/* Title & Subtitle */}
          <h2 className="text-5xl font-bold mb-2">
            {car.brand} {car.model.toUpperCase()}
          </h2>
          <p className="text-gray-600 font-medium text-lg mb-6">
            {car.year} • {car.category}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
              {car.seats} Seats
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
              {car.fuel_type}
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
              {car.transmission}
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
              {car.location}
            </div>
          </div>


          {/* features */}
          <div>
            <h1 className="text-xl font-medium mb-3">Features</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                <li key={item} className="flex items-center text-gray-500">
                  <img src={assets.check_icon} className="h-4 mr-2" alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>


          {/* Description */}
          <div className='mt-4'>
            <h3 className="text-xl font-bold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
          </div>
        </div>



        {/* right side form  */}
        <div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-lg rounded-xl p-6 w-full lg:w-80 space-y-5">
            {/* Price per day */}
            <div>
              <h2 className="text-3xl font-bold">₹{car.pricePerDay}</h2>
              <p className="text-sm text-gray-500">per day</p>
            </div>

            {/* Pickup Date */}
            <div>
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date
              </label>
              <input 
              value={pickupDate}
              onChange={(e)=>setPickupDate(e.target.value)}
                type="date"
                id="pickup"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Return Date */}
            <div>
              <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">
                Return Date
              </label>
              <input
               value={returnDate}
              onChange={(e)=>setReturnDate(e.target.value)}
                type="date"
                id="return"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Book Now Button */}
            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Book Now
            </button>

            {/* Note */}
            <p className="text-xs text-gray-500 text-center">
              No credit card required to reserve
            </p>
          </div>
</form>
        </div>


      </div>
    </div>


  ) : <Loading />
};

export default CarDetails;
