import React, { useState } from "react";
import { assets } from "../../assets/assets"; // Adjust path as needed
import { useLocation } from "react-router-dom";
import {ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const Sidebar = () => {
  const [image, setImage] = useState("");
  const location = useLocation();
  const {user,axios,fetchUser} =useAppContext() ;

  const updatedImage = async () => {
try {
  const formData=new FormData()
  formData.append('image',image)
  const {data}=await axios.post('/api/owner/add-owner-image',formData)
  if(data.success){
    fetchUser()
    toast.success(data.message)
    setImage(''); // it only clear the image usestate so that next time a user can update a image 
  }else{
    toast.error(data.message);
  }
  
} catch (error) {
   toast.error(error.message);
}
  };

  return (
<div className="relative min-h-screen w-full max-w-[182px] sm:max-w-[250px] border-r border-gray-200 bg-white p-4 flex flex-col items-center text-sm shadow-sm">
      {/* Profile Upload */}
      <div className="group relative mb-6">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border shadow-md"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" className="w-6 h-6" />
          </div>
        </label>
      </div>

      {/* Show Update Button if image is selected */}
      {image && (
        <button
          className="mb-4 px-4 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition"
          onClick={updatedImage}
        >
          Update Photo
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

        <div className="w-full">
      {ownerMenuLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
            link.path === location.pathname
              ? "bg-primary/10 text-primary"
              : "text-gray-600"
          }`}
         >
          {/* Icon (colored if active) */}
          <img
            src={
              link.path === location.pathname
                ? link.coloredIcon
                : link.icon
            }
            alt="icon"
          />

          {/* Link Name */}
          <span className="max-md:hidden">{link.name}</span>

        
        </NavLink>
      ))}
    </div>

    </div>
  );
};

export default Sidebar
