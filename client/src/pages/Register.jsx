import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({ username: "", email: "", password: "" });

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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-10">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400 mb-1">Taskify</h1>
          <p className="text-sm text-zinc-500">Create your account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Username</label>
            <input
              type="text"
              required
              name="username"
              placeholder="abcd"
              value={Values.username}
              onChange={change}
              className="bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="abc@gmail.com"
              value={Values.email}
              onChange={change}
              className="bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="••••••••"
              value={Values.password}
              onChange={change}
              className="bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            onClick={register}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mt-1"
          >
            Register
          </button>

          <p className="text-center text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 font-semibold hover:underline">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;