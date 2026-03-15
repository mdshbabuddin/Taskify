import React from 'react';

const TaskCard = ({ data }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  }

  return (
    <button
      className='bg-white rounded px-2 sm:px-4 w-full py-2 sm:py-3 hover:shadow transition-all duration-300 text-left'
      onClick={(event) => showEditDiv(event, data._id)}
    >
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
        <h1 className='text-sm sm:text-base font-medium'>{data.title}</h1>
        <div
          className={`text-xs sm:text-sm ${data.priority === "low" ? "text-green-500 bg-green-100" : data.priority === "medium" ? "text-yellow-500 bg-yellow-100" : "text-red-500 bg-red-100"} px-2 py-1 rounded-full text-center`}
        >
          {data.priority}
        </div>
      </div>
      <hr className='my-2' />
      <p className='text-xs sm:text-sm text-zinc-500'>{data.description}</p>
    </button>
  );
}

export default TaskCard;
