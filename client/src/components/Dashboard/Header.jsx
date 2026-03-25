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
        <div className="flex flex-col sm:flex-row px-4 sm:px-6 md:px-12 py-4 items-start sm:items-center justify-between border-b gap-4 sm:gap-8">
            <div>
                <h1 className='text-xl sm:text-2xl text-blue-800 font-semibold'>Taskify</h1>
            </div>
            <div className='flex gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-start'>
                <button
                    className='hover:text-blue-800 transition-all duration-300 text-sm sm:text-base'
                    onClick={() => setAddTaskDiv("block")}
                >
                    Add Task
                </button>
                <button
                    className='text-xl sm:text-2xl hover:text-red-600 transition-all duration-300'
                    onClick={logout}
                >
                    <IoLogOutOutline />
                </button>
            </div>
        </div>
    );
};

export default Header;
