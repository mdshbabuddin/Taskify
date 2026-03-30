import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      localStorage.clear("userLoggedIn");
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800">

      {/* Logo */}
      <h1 className="text-xl font-bold text-indigo-400">Taskify</h1>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setAddTaskDiv("block")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Add Task
        </button>
        <button
          onClick={logout}
          title="Logout"
          className="text-zinc-400 hover:text-red-400 text-2xl transition-colors"
        >
          <IoLogOutOutline />
        </button>
      </div>

    </div>
  );
};

export default Header;