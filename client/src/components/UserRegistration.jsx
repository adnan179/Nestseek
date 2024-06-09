import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'buyer',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const { firstName, lastName, email, phoneNumber, password, role } = form;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async(e) => {
    e.preventDefault();
    try{
      await register(form);

    }catch(err){
      setError("User already exists");
    }
  };

  return (
    <div className='flex flex-col w-full h-full p-6'>
      <h1 className='text-purple-600 font-bold text-3xl'>Rentify</h1>
      {/* form cont */}
    <form onSubmit={onSubmit} className='flex flex-col gap-2 p-10'>
      {/* first name cont */}
      <div className='flex flex-col gap-1'>
        <label>First Name<span className='text-red-700'>*</span></label>
        <input 
          type="text" 
          name="firstName" 
          value={firstName} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full' 
          placeholder='Enter your first name'
          autoComplete='off' 
          />
      </div>
      {/* last name cont */}
      <div className='flex flex-col gap-1'>
        <label>Last Name<span className='text-red-700'>*</span></label>
        <input 
          type="text" 
          name="lastName" 
          value={lastName} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full' 
          placeholder='Enter your last name'
          autoComplete='off'
          />
      </div>
      {/* email cont */}
      <div className='flex flex-col gap-1'>
        <label>Email<span className='text-red-700'>*</span></label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full'  
          placeholder='Enter your email'
          autoComplete='off'
          />
      </div>
      {/* phone number cont */}
      <div className='flex flex-col gap-1'>
        <label>Phone Number<span className='text-red-700'>*</span></label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={phoneNumber} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full'  
          placeholder='Enter your phone number'
          autoComplete='off'
          />
      </div>
      {/* password cont */}
      <div className='flex flex-col gap-1'>
        <label>Password<span className='text-red-700'>*</span></label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full'  
          placeholder='Enter your password'
          autoComplete='off'
          />
      </div>
      {/* role cont */}
      <div className='flex flex-col gap-1'>
        <label>Role<span className='text-red-700'>*</span></label>
        <select 
          name="role" 
          value={role} 
          onChange={onChange} 
          required 
          className='shadow-lg rounded-lg px-4 py-2 outline-none focus:ring-purple-600 focus:ring-2 w-full' >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button 
        type="submit" 
        className=' mt-2 flex justify-center items-center text-white bg-purple-600 px-4 py-2 w-full rounded cursor-pointer hover:bg-transparent hover:border-purple-600 hover:border-2 hover:text-purple-600 font-medium transition ease-in duration-400'>
          Register
        </button>
      {error && <p className='text-red-600 text-sm'>{error}</p>}
    </form>
    <div className='flex flex-row gap-1'>
        <p>
          Existing user?
        </p>
        <button className='border-none bg-transparent text-purple-600 font-medium cursor-pointer'
          onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserRegister;
