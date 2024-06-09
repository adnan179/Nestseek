import React from 'react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () =>{
    logout();
  }
  return (
    <nav className='sticky top-0 left-0 w-full h-[70px] border-b-2 border-gray-200 bg-white flex justify-between items-center px-10'>
      <h1 className='text-2xl text-purple-600 font-bold text-shadow-sm'>
        Rentify
      </h1>
      <button className='flex rounded-md shadow-md shadow-purple-400 text-purple-600 justify-center items-center px-4 py-2
        hover:bg-purple-600 hover:text-white font-medium transition ease-out duration-500'
        onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar;
