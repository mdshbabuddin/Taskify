import React from 'react';

const StackTitle = ({ title }) => {
  // Different dot color for each column
  const dotColor =
    title === "Yet To Start" ? "bg-zinc-500" :
    title === "In Progress"  ? "bg-yellow-400" :
    "bg-green-400";

  const textColor =
    title === "Yet To Start" ? "text-zinc-400" :
    title === "In Progress"  ? "text-yellow-400" :
    "text-green-400";

  return (
    <div className="flex items-center gap-2 pb-3 border-b border-zinc-700 mb-3">
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      <h1 className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>
        {title}
      </h1>
    </div>
  );
};

export default StackTitle;