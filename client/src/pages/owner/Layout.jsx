import React, { useEffect } from 'react';
import NavbarOwner from '../../components/owner/NavbarOwner';
import Sidebar from '../../components/owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
// import { dummyUserData } from '../../assets/assets';

const Layout = () => {
  const { isOwner, user, navigate } = useAppContext();

  useEffect(() => {
    if (user && !isOwner) {
      navigate('/');
    }
  }, [user, isOwner]); // wait until user is loaded
  return (
    <div className="flex flex-col h-screen">
      <NavbarOwner />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout
