import React, { useState } from "react";
import { Link } from "react-router-dom";

const Task = ({ task, handleTaskUpdate }) => {
    const [isDragging, setIsDragging] = useState(false);

    const name = localStorage.getItem("name");
    console.log(name, 8)


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
            className={`${taskItem} ${isDraggingClass} mx-4 justify-between items-center px-4 py-2 flex gap-4 bg-red-200 cursor-grab shadow-md rounded-md relative ${name === task.user?.name ? "bg-yellow-100" : " "}`}
            draggable={!isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Link to={`/task/${task._id}`} role={"heading"} className="font-serif flex items-center gap-2 w-96">{task.title}
                {/* {task.user.map((user) => (
                    <span key={user._id} className="font-sans text-xs">{user.name}</span>
                ))} */}

            </Link>
            {name === task.user?.name ? <div className="font-sans text-green-500 absolute -top-3 -left-1 text-4xl">*</div> : " "}
            <div key={task.user?._id} className={`font-sans text-xs text-blue-700 ${name === task.user?.name ? "text-green-700" : " "}`}>{task.user?.name}</div>

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