import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();


  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      await login(email,password);
    }catch(err){
      setError("Invalid credentials");
    }
   
  };

  return (
    <div className='flex flex-col p-10'>
      {/* logo cont */}
      <div className='flex justify-start items-center text-purple-600 font-bold text-3xl'>
        Rentify
      </div>
      {/* form cont */}
      <div className='flex w-full h-full justify-start items-center'>
      <form onSubmit={onSubmit} className='flex flex-col gap-2'>
      {/* email cont */}
      <div className='flex flex-col gap-1'>
        <label>Email<span className='text-red-700'>*</span></label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className='shadow-lg rounded-md px-4 py-2 outline-none focus:ring-purple-600  focus:ring-2 w-full' 
          placeholder='Enter your email'
          autoComplete='off'/>
      </div>
      
      {/* password cont */}
      <div className='flex flex-col gap-1'>
        <label>Password<span className='text-red-700'>*</span></label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full' 
          placeholder='Enter your password'
          autoComplete='off'
        />
      </div>
      
      <button type="submit" className='shadow-lg mt-2 flex justify-center items-center text-white bg-purple-600 px-4 py-2 w-full rounded cursor-pointer  hover:bg-transparent hover:border-purple-600 hover:border-2 hover:text-purple-600 font-medium transition ease-in duration-400'>
        Login
      </button>
      {error && <p className='text-red-600 text-sm'>{error}</p>}
    </form>
    </div>
    {/* new user cont */}
      <div className='flex flex-row gap-1'>
        <p>
          New user?
        </p>
        <button className='border-none bg-transparent text-purple-600 font-medium cursor-pointer'
          onClick={() => navigate("/")}>
          Register
        </button>
      </div>
    </div>
    
    
  );
};

export default UserLogin;
