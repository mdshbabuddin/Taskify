import React from 'react';
import TaskCard from './TaskCard';

const Completed = ({ task }) => {
  if (!task || task.length === 0) {
    return <p className="text-xs text-zinc-600 text-center py-6">No completed tasks</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {task.map((item, i) => (
        <TaskCard key={i} data={item} />
      ))}
    </div>
  );
};

export default Completed;