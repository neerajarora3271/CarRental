import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const currency = import.meta.env.VITE_CURRENCY;
 axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cars, setCars] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
            fetchUser();
        } else {
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
            setIsOwner(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/getuserdata');
            if (data.Success) {
                console.log("xxxxxx",data.user)
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
                fetchCars(); // Fetch cars after user is set
            } else {
                console.log("Failed to fetch user data");
                navigate("/");
            }
        } catch (err) {
            console.error(" Fetch user failed:", err.message);
            navigate("/");
        }
    };

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data.success) {
                setCars(data.cars);
                console.log(" Cars fetched and set in state:", data.cars); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(" Error fetching cars:", error.message);
            toast.error("Please login to start");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("You are successfully logged out");
    };

    return (
        <AppContext.Provider
            value={{
                user, setUser,
                token, setToken,
                isOwner, setIsOwner,
                fetchCars, fetchUser,
                showLogin, setShowLogin,
                logout,
                cars, setCars,
                pickupDate, returnDate,
                setReturnDate, setPickupDate,
                axios,navigate,currency,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
 
