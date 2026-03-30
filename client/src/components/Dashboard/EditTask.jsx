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
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/getTask/${EditTaskId}`,
          { withCredentials: true }
        );
        setValues(res.data.taskDetails);
      } catch (error) {}
    };
    fetchTask();
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
      toast.success(res.data.message || "Task deleted successfully");
      setTimeout(() => {
        window.sessionStorage.clear("editTaskId");
        setEditTaskDiv("hidden");
        window.location.reload();
      }, 700);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  const inputClass = "bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 placeholder-zinc-600 transition-colors w-full";
  const labelClass = "text-xs font-semibold text-zinc-500 uppercase tracking-wider";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/3">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-bold text-zinc-100">Edit Task</h1>
        <button
          onClick={() => {
            window.sessionStorage.clear("editTaskId");
            setEditTaskDiv("hidden");
          }}
          className="text-zinc-500 hover:text-zinc-300 text-xl transition-colors"
        >
          ✕
        </button>
      </div>

      <form className="flex flex-col gap-4">

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={Values.title}
            onChange={change}
            className={inputClass}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 w-full">
            <label className={labelClass}>Priority</label>
            <select name="priority" value={Values.priority} onChange={change} className={inputClass}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className={labelClass}>Status</label>
            <select name="status" value={Values.status} onChange={change} className={inputClass}>
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            placeholder="Task description..."
            value={Values.description}
            onChange={change}
            className={`${inputClass} h-28 resize-none`}
          />
        </div>

        <div className="flex gap-3 mt-1">
          <button
            type="button"
            onClick={(e) => editTask(e, Values._id)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={(e) => deleteTask(e, Values._id)}
            className="flex-1 border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.sessionStorage.clear("editTaskId");
              setEditTaskDiv("hidden");
            }}
            className="flex-1 border border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditTask;