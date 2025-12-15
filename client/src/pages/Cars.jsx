import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

const Cars = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState('');
  const { axios,cars } = useAppContext()
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  // console.log(pickupDate, pickupLocation, returnDate)
  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async ()=>{
    if(Input === ''){
      setFilteredCars(cars)
      return null

    }
    const filtered =cars.slice().filter((car)=>{
         return car.brand.toLowerCase().includes(Input.toLowerCase()) || 
      car.model.toLowerCase().includes(Input.toLowerCase())   ||
       car.location.toLowerCase().includes(Input.toLowerCase())   ||
       car.category.toLowerCase().includes(Input.toLowerCase()) || 
      car.transmission.toLowerCase().includes(Input.toLowerCase()) ||
       car.fuel_type.toLowerCase().includes(Input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    const { data } = await axios.post('/api/bookings/check-availability', {
      location: pickupLocation, 
      pickupDate,
      returnDate
    });

    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No Cars Available");
      }
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailability()
  }, [])

  useEffect(()=>{
  !isSearchData && applyFilter()
  },[Input,cars])
  return (
    <>
      <div className='mt-10 mb-4'>
        <div className='w-full h-auto bg-gray-100 py-5 '>
          <h1 className='text-4xl font-extrabold text-black mt-2 flex justify-center '>Available Cars</h1>
          <h2 className='flex justify-center mt-3'> Browse our selection of premium vehicles available for your next adventure </h2>


          <div className='flex justify-center mt-10 mb-4'>
            <div className="flex w-full max-w-xl items-center border border-gray-300 rounded-xl px-3 mt-2 mb-5">
              <img src={assets.search_icon} alt="Search" className="w-5 h-5 mr-2" />
              <input onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Search by model, Feature"
                className="flex-1 py-3 focus:outline-none "
                required
              />
              <img src={assets.filter_icon} className='mr-3' />
            </div>
          </div>




        </div>
        <div>

        </div>


        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mt-8">show all {filteredCars.length} cars</h1>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-13 mb-20 ml-3 " >
          {filteredCars.map((car) => (


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

              {/* img  */}
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

              {/* car data  */}
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


        <ToastContainer />
      </div>
    </>

  )
}

export default Cars;