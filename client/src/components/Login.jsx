import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const {setShowLogin,axios,setToken}=useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(`/api/user/${state}`, {
      name,
      email,
      password,
    });

    if (data.success) {
  toast.success("You are logged in"); 

      navigate("/");
      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage:", localStorage.getItem("token"));
      console.log(data.token)
      setToken(data.token);
      setShowLogin(false);
      // console.log(data.message)
    } else {
      console.error("Error:", data.message);
      toast.error(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Server error:", err.message);
    toast.error("Failed to connect to server");
  }
};


  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          {state === "login" ? " Login" : " Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-indigo-500 cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-indigo-500 cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;
