import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
      username: "",
      email: "",
      password: "",
  });

  const change = (e) => {
      const { name, value } = e.target;
      setValues({ ...Values, [name]: value });
  };

  const register = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/register`, Values);
          toast.success(res.data.success);
          navigate("/login");
      } catch (error) {
          toast.error(error?.response?.data?.error || "Something went wrong");
      }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center px-4 sm:px-6'>
        {/* Title */}
        <div className='w-full max-w-md text-center'>
            <h1 className='text-3xl sm:text-4xl font-bold mb-1 text-blue-800'>Taskify</h1>
            <h3 className='text-sm sm:text-base font-semibold text-zinc-900'>
                Register with Taskify
            </h3>
        </div>

        {/* Form */}
        <div className='w-full max-w-md mt-4'>
            <form className='flex flex-col gap-4'>
                <input 
                  type="text" 
                  required 
                  placeholder='Username' 
                  className='border rounded px-3 sm:px-4 py-2 border-zinc-400 w-full outline-none text-sm sm:text-base' 
                  name='username'
                  value={Values.username}
                  onChange={change}
                />
                <input 
                  type="email" 
                  required 
                  placeholder='Email' 
                  className='border rounded px-3 sm:px-4 py-2 border-zinc-400 w-full outline-none text-sm sm:text-base' 
                  name='email'
                  value={Values.email}
                  onChange={change}
                />
                <input 
                  type="password" 
                  required 
                  placeholder='Password' 
                  className='border rounded px-3 sm:px-4 py-2 border-zinc-400 w-full outline-none text-sm sm:text-base' 
                  name='password'
                  value={Values.password}
                  onChange={change}
                />
                <button 
                  type="submit"
                  className='bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base'
                  onClick={register}
                >
                    Register
                </button>
                <p className='text-center font-semibold text-gray-900 text-xs sm:text-sm'>
                    Already have an account? <Link to="/login" className='text-blue-700 hover:underline'>Login</Link>
                </p>
            </form>
        </div>   
    </div>
  );
};

export default Register;
