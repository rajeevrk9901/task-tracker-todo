import React from "react";

function Task({ id, title, status, onStatusChange }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, newStatus) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    onStatusChange(taskId, newStatus);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event, status)}
    >
      <p>{title}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default Task;