// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import MyBookings from './pages/MyBookings';
// import Cars from './pages/Cars';
// import CarDetails from './pages/CarDetails';

// // Owner Imports
// import Layout from "./pages/owner/Layout";
// import Dashboard from './pages/owner/Dashboard';
// import AddCar from './pages/owner/AddCar';
// import ManageCars from './pages/owner/ManageCars';
// import ManageBookings from './pages/owner/ManageBookings';
// import Login from './components/Login';
// import {Toaster} from 'react-hot-toast';
// const AppRoutes = ({ ShowLogin,setShowLogin }) => {
//   const location = useLocation();
//   const isOwnerPath = location.pathname.startsWith('/owner');
  

//   return (
//     <>
//     {ShowLogin && <Login setShowLogin={setShowLogin}/>}
//       {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/cars" element={<Cars />} />
//         <Route path="/car-detail/:id" element={<CarDetails />} />

//         {/* Owner Routes */}
//         <Route path="/owner" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="add-car" element={<AddCar />} />
//           <Route path="manage-cars" element={<ManageCars />} />
//           <Route path="manage-bookings" element={<ManageBookings />} />
//         </Route>
//       </Routes>
// {!isOwnerPath && <Footer />}
//     </>
//   );
// };

// const App = () => {
//   const [ShowLogin, setShowLogin] = useState(false);

//   return (
//       <Router>
  
//       <AppRoutes ShowLogin={ShowLogin} setShowLogin={setShowLogin} />
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Layout from "./pages/owner/Layout";
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  // const [ShowLogin, setShowLogin] = useState(false);
 const { showLogin } = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <>
      <Toaster />
    {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-detail/:id" element={<CarDetails />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
