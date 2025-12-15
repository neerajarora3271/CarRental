import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css_files/Navbar.css"
import { assets, menuLinks } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const {setShowLogin,user,logout,isOwner,axios,setIsOwner}=useAppContext();

    const navigate = useNavigate();

    const changeRole=async ()=>{
        try {
            const{data}=await axios.post("/api/owner/change-role")
            if(data.success){
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error("you need to log in first")
            }
            
        } catch (error) {
            toast.error("please log in first",error.message)
            
        }
    }

    return (
        <>
            <nav className="bg-white text-black px-4 py-7 flex items-center justify-between border-b-1 border-b-gray-300">

                <div className="logo">
                    <img src={assets.logo} alt="Logo" />

                </div>

                {/* Menu Links */}
                <div className="space-x-6 responsive-menu">
                    {menuLinks.map((link, index) => (
                        <Link key={index} to={link.path} className="hover:underline  font-normal options">
                            {link.name}
                        </Link>
                    ))}
                </div>
                


                <div className="responsive-buttons">
                    <button
                        onClick={()=>{user ? logout() : setShowLogin(true)}}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg login-button"
                    >
                        {user ? "Logout": "Login"}
                    </button>


                </div>

                <div className="responsive-buttons">
                    <button
                        onClick={() => {isOwner ? navigate('/owner') :changeRole()}}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg dashboard-button"
                    >
                      {isOwner ?"Dashboard" : "Add your Car"}
                    </button>


                </div>


            </nav>
        </>

    );
};

export default Navbar;