import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Hero = () => {
    const [PickupLocation, setPickupLocation] = useState('');

    const {pickupDate,setPickupDate,returnDate,setReturnDate,navigate}=useAppContext();
    const handleSearch=(e)=>{
        e.preventDefault();
        navigate('/cars?pickupLocation='+ PickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }
    return (
        <div className='h-screen flex flex-col item-center justify-center gap-14'>
            <h1 className='text-6xl md:text-5xl font-semibold mx-auto'>Luxury cars on rent </h1>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row mx-auto items-center justify-between gap-4 p-4 pl-10 rounded-lg md:rounded-full w-full max-w-xs md:max-w-[900px] bg-white border-1 border-gray-300 ">
                
                
                {/* Pickup Location */}
                <div className="  mt-4 flex flex-col items-start min-w-[150px]">
                <label className="text-sm !font-bold">
                        Pick-up Location
                    </label>
                    <select  required value={PickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
                        className="text-sm border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
                    
                        <option value="">Pickup Location</option>
                        {cityList.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        {PickupLocation ? PickupLocation : "Please select location"}
                    </p>
                </div>

                {/* Pick-up Date */}
                <div className="flex flex-col items-start ">
                    <label htmlFor="pickup-date" className="text-sm !font-bold">
                        Pick-up Date
                    </label>
                    <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split("T")[0]}
                        className="text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                        required/>
                    
                </div>

                {/* Return Date */}
                <div className="flex flex-col items-start ">
                    <label htmlFor="return-date" className="text-sm !font-bold">
                        Return Date
                    </label>
                    <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date"
                        className="text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none" required />
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200"
                >
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 h-4 brightness-300"
                    />
                    Search
                </button>
            </form>


            <img
                src={assets.main_car}
                alt="car"
                className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-1xl h-auto"
            />
        </div>


    )
}

export default Hero