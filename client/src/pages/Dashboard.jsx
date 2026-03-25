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
    <div className="w-full relative">
      {/* Header */}
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Task Columns */}
      <div className="px-4 sm:px-6 md:px-12 py-4 bg-zinc-100 min-h-[89vh] flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-12">
        {/* Yet To Start */}
        <div className="w-full md:w-1/3">
          <StackTitle title={"Yet To Start"} />
          <div className="pt-2">
            {Tasks && <YetToStart task={Tasks[0].yetToStart} />}
          </div>
        </div>

        {/* In Progress */}
        <div className="w-full md:w-1/3">
          <StackTitle title={"In Progress"} />
          <div className="pt-2">
            {Tasks && <InProgress task={Tasks[1].inProgress} />}
          </div>
        </div>

        {/* Completed */}
        <div className="w-full md:w-1/3">
          <StackTitle title={"Completed"} />
          <div className="pt-2">
            {Tasks && <Completed task={Tasks[2].completed} />}
          </div>
        </div>
      </div>

      {/* Add Task Modal Overlay */}
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`} />
      <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center p-4`}>
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Edit Task Modal Overlay */}
      <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`} />
      <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center p-4`}>
        {EditTaskId && (
          <EditTask 
            EditTaskId={EditTaskId}
            setEditTaskDiv={setEditTaskDiv}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
