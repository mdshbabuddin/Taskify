import React, { useState, useEffect } from 'react';
import Header from "../components/Dashboard/Header";
import AddTask from '../components/Dashboard/AddTask';
import EditTask from '../components/Dashboard/EditTask';
import StackTitle from '../components/Dashboard/StackTitle';
import YetToStart from '../components/Dashboard/YetToStart';
import InProgress from '../components/Dashboard/InProgress';
import Completed from '../components/Dashboard/Completed';
import axios from "axios";

const Dashboard = () => {
  const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
  const [Tasks, setTasks] = useState();
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditTaskId, setEditTaskId] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/userDetails`,
          { withCredentials: true }
        );
        setTasks(res.data.tasks);
      } catch (error) {}
    };
    fetchUserDetails();

    if (window.sessionStorage.getItem("editTaskId")) {
      setEditTaskDiv("block");
      setEditTaskId(window.sessionStorage.getItem("editTaskId"));
    }
  }, [AddTaskDiv]);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Header */}
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Kanban Columns */}
      <div className="flex flex-col md:flex-row gap-5 px-6 py-6">

        {/* Yet To Start */}
        <div className="w-full md:w-1/3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <StackTitle title={"Yet To Start"} />
          <div className="flex flex-col gap-2">
            {Tasks && <YetToStart task={Tasks[0].yetToStart} />}
          </div>
        </div>

        {/* In Progress */}
        <div className="w-full md:w-1/3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <StackTitle title={"In Progress"} />
          <div className="flex flex-col gap-2">
            {Tasks && <InProgress task={Tasks[1].inProgress} />}
          </div>
        </div>

        {/* Completed */}
        <div className="w-full md:w-1/3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <StackTitle title={"Completed"} />
          <div className="flex flex-col gap-2">
            {Tasks && <Completed task={Tasks[2].completed} />}
          </div>
        </div>

      </div>

      {/* Add Task Modal */}
      <div className={`${AddTaskDiv} fixed inset-0 bg-black/60 z-40`} />
      <div className={`${AddTaskDiv} fixed inset-0 flex items-center justify-center z-50 px-4`}>
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Edit Task Modal */}
      <div className={`${EditTaskDiv} fixed inset-0 bg-black/60 z-40`} />
      <div className={`${EditTaskDiv} fixed inset-0 flex items-center justify-center z-50 px-4`}>
        {EditTaskId && (
          <EditTask EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv} />
        )}
      </div>

    </div>
  );
};

export default Dashboard;