import React from 'react';
import { assets } from '../../assets/assets';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { setToken, setUser } = useAppContext(); // assuming you have state in context
  const navigate = useNavigate();

  const logout = () => {
    // 1️⃣ Clear token from localStorage
    localStorage.removeItem('token');

    // 2️⃣ Clear any user state in context
    if (setToken) setToken(null);
    if (setUser) setUser(null);

    // 3️⃣ Redirect to login page
    navigate('/');
  };

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img
          onClick={() => navigate('/')}
          src={assets.mylogo}
          alt=""
          className='w-40 cursor-pointer'
        />
        <button
          onClick={logout}
          className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
        >
          Logout
        </button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
