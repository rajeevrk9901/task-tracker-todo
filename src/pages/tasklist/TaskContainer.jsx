import React from "react";
import Task from "./Task";

import { BsListTask } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'
import { BiTask } from 'react-icons/bi'

const TaskContainer = ({ tasks, status, handleTaskUpdate }) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        handleTaskUpdate(taskId, status);
    };

    // let todoClass = "task-container TODO bg-red-200";
    // let inprogressClass = "task-container INPROGRESS";
    // let doneClass = "task-container DONE";

    let taskContainer = "";

    if (status === "TODO") {
        taskContainer = "task-container TODO bg-red-200";
    } else if (status === "INPROGRESS") {
        taskContainer = "task-container INPROGRESS bg-yellow-200 ";
    } else if (status === "DONE") {
        taskContainer = "task-container bg-green-400";
    }

    return (
        <div className={`${taskContainer} overflow-y-auto pb-12`} onDragOver={handleDragOver} onDrop={handleDrop}>
            <h3 className="font-semibold uppercase mb-4 flex justify-center items-center gap-2 py-4 underline-offset-1 underline">{status}
                <span>
                    {status === "TODO" ? <BsListTask /> : status === "INPROGRESS" ? <FcProcess /> : <BiTask />}
                </span>
            </h3>

            <div div className={`${taskContainer} flex flex-col gap-2`}>
                {
                    tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                            <Task key={task._id} task={task} handleTaskUpdate={handleTaskUpdate} />
                        ))
                }
            </div >
        </div >
    );
};

export default TaskContainer;