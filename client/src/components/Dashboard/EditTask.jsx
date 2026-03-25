import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  useEffect(() => {
    if (!EditTaskId) return;

    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/getTask/${EditTaskId}`, {
          withCredentials: true,
        });
        setValues(res.data.taskDetails);
      } catch (error) {}
    };
    fetch();
  }, [EditTaskId]);

  const editTask = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/editTask/${id}`,
        Values,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Task updated successfully");
      setTimeout(() => {
        window.sessionStorage.clear("editTaskId");
        setEditTaskDiv("hidden");
        window.location.reload();
      }, 700);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  const deleteTask = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/deleteTask/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Task Deleted successfully");
      setTimeout(() => {
        window.sessionStorage.clear("editTaskId");
        setEditTaskDiv("hidden");
        window.location.reload();
      }, 700);      
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className='bg-white rounded px-4 py-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/3'>
      <h1 className='text-center font-semibold text-xl'>Edit Task</h1>
      <hr className='mb-4 mt-2' />

      <form className='flex flex-col gap-4'>
        <input
          type="text"
          className='border px-2 py-1 rounded border-zinc-300 outline-none w-full'
          placeholder='Title'
          name='title'
          value={Values.title}
          onChange={change}
        />

        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div className='w-full sm:w-1/2'>
            <h3 className='mb-2 text-sm sm:text-base'>Select Priority</h3>
            <select
              name="priority"
              className='border px-2 py-1 rounded border-zinc-300 outline-none w-full'
              value={Values.priority}
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className='w-full sm:w-1/2'>
            <h3 className='mb-2 text-sm sm:text-base'>Select Status</h3>
            <select
              name="status"
              className='border px-2 py-1 rounded border-zinc-300 outline-none w-full'
              value={Values.status}
              onChange={change}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name="description"
          placeholder='Description'
          className='border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh] w-full'
          value={Values.description}
          onChange={change}
        />

        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <button
            type="button"
            className='w-full sm:w-1/3 bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded'
            onClick={(e) => editTask(e, Values._id)}
          >
            Edit Task
          </button>

          <button
            type="button"
            className='w-full sm:w-1/3 border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300 rounded'
            onClick={(e) => deleteTask(e, Values._id)}
          >
            Delete Task
          </button>

          <button
            type="button"
            className='w-full sm:w-1/3 border border-black py-2 hover:bg-zinc-100 transition-all duration-300 rounded'
            onClick={(event) => {
              event.preventDefault();
              window.sessionStorage.clear("editTaskId");
              setEditTaskDiv("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default EditTask;
