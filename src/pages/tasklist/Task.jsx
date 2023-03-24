import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        taskItem = "task-container  bg-slate-100";
    } else if (task.status === "INPROGRESS") {
        taskItem = "task-container INPROGRESS bg-slate-100 ";
    } else if (task.status === "DONE") {
        taskItem = "task-container bg-slate-100";
    }

    let isDraggingClass = "";

    if (isDragging) {
        isDraggingClass = "bg-red-400";
    }

    return (
        <div
            className={`${taskItem} ${isDraggingClass} mx-4 justify-between items-center px-4 py-2 flex gap-4 bg-red-200 cursor-grab shadow-md rounded-md`}
            draggable={!isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Link to={`/task/${task._id}`} role={"heading"} className="font-serif flex items-center gap-2 w-96">{task.title}
                {/* {task.user.map((user) => (
                    <span key={user._id} className="font-sans text-xs">{user.name}</span>
                ))} */}

            </Link>
            <div key={task.user?._id} className="font-sans text-xs text-blue-700">{task.user?.name}</div>

            <div>
            <button className="cursor-pointer lowercase bg-yellow-300 px-2 py-[1px]" onClick={handleMoveTask}>
                {task.status === "TODO"
                    ? "Start"
                    : task.status === "INPROGRESS"
                        ? "Finish"
                        : "Reset"}
            </button>
            </div>
        </div>
    );
};

export default Task;