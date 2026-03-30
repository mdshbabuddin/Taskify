import React from 'react';

const TaskCard = ({ data }) => {
  const showEditDiv = (e, id) => {
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  };

  // Priority badge colors
  const priorityClass =
    data.priority === "low"    ? "text-green-400 bg-green-400/10 border border-green-400/20" :
    data.priority === "medium" ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20" :
    "text-red-400 bg-red-400/10 border border-red-400/20";

  return (
    <button
      onClick={(e) => showEditDiv(e, data._id)}
      className="w-full text-left bg-zinc-800 border border-zinc-700 hover:border-zinc-500 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-lg"
    >
      {/* Title and priority */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h1 className="text-sm font-semibold text-zinc-100">{data.title}</h1>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${priorityClass}`}>
          {data.priority}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{data.description}</p>
    </button>
  );
};

export default TaskCard;