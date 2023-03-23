import React, { useState } from "react";

const Task = ({ task, handleTaskUpdate }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", task._id);
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleMoveTask = () => {
        const newStatus =
            task.status === "TODO"
                ? "INPROGRESS"
                : task.status === "INPROGRESS"
                    ? "DONE"
                    : "TODO";
        handleTaskUpdate(task._id, newStatus);

    };

    let taskItem = "";

    if (task.status === "TODO") {
        taskItem = "task-container TODO bg-slate-400";
    } else if (task.status === "INPROGRESS") {
        taskItem = "task-container INPROGRESS bg-slate-400 ";
    } else if (task.status === "DONE") {
        taskItem = "task-container bg-slate-400";
    }

    let isDraggingClass = "";

    if (isDragging) {
        isDraggingClass = "opacity-60 ";
    }

    return (
        <div
            className={`${taskItem} ${isDragging ? isDraggingClass : ""} px-4 py-2 flex gap-4 bg-red-200 cursor-grab`}
            draggable={!isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div role={"heading"} className="font-serif">{task.title}</div>
            <button className="cursor-pointer lowercase bg-white px-2 py-[1px]" onClick={handleMoveTask}>
                {task.status === "TODO"
                    ? "Start"
                    : task.status === "INPROGRESS"
                        ? "Finish"
                        : "Reset"}
            </button>
        </div>
    );
};

export default Task;