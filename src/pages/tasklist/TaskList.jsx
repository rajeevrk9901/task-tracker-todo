import TaskContainer from "./TaskContainer";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";
import CreateTask from "./CreateTask";
import Toast from "../../components/toast/Toast";
import api from "../../utils/ApiServices";


const TaskList = () => {

    const { role } = useContext(AuthContext)

    const [tasks, setTasks] = useState([]);
    const [taskReload, setTaskReload] = useState(false);

    const [popup, setPopup] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])



    // const mySearchItem = tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))


    // NOTE  using debouncing for search

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filteredTasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );

            setSearchResult(filteredTasks)
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [search, tasks]);

    const handleTaskUpdate = async (taskId, newStatus) => {
        // console.log(taskId, newStatus, 25)
        // Find the task with the given ID and update its status
        const updatedTasks = tasks.map((task) =>
            task._id === parseInt(taskId) ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);

        // console.log(`Task ${taskId} status changed to ${newStatus}.`)

        try {
            const res = await api.put(`tasks/${role === "ADMIN" ? "admin/" + taskId : taskId}`, { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }

            ).then((res) => {
                // console.log(res, "create task response");

                if (res.status === 200) {
                    console.log("updated")
                    setToastMessage("Task Moved To " + newStatus)
                    setToast(true)
                    setTaskReload(!taskReload)
                }
            })
        } catch (error) {
            console.log(error, 53)
            setToastMessage(error.response.data.message)
            setToast(true)
        }

    };

    const handlePopup = () => {
        setPopup(true)
    }



    useEffect(() => {

        try {
            api.get(`tasks`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((response) => {
                setTasks(response.data);
            });
        } catch (error) {
            setToastMessage(error.response.data.message)
            setToast(true)
            console.error(error);
        }

    }, [taskReload]);



    const handleToastClose = () => {
        setToast(false);
    };


    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }





    return (
        <div className="w-[1200px] overflow-x-auto">
            {toast && <Toast message={toastMessage} onClose={handleToastClose} />}
            {popup && <CreateTask taskReload={taskReload} setTaskReload={setTaskReload} popup={setPopup} />}

            <div className='flex md:flex-row flex-col gap-5 absolute md:left-44 right-0'>
                <div>
                    <input onChange={handleSearch} value={search} type="text" placeholder='Search...' className='w-24 outline-slate-400 rounded-md px-3 py-1  focus:outline-2 focus:outline-blue-500 focus:w-full' />
                </div>
                <div>
                    <button onClick={handlePopup} className="bg-blue-200 px-3 py-1 shadow-md rounded-md">Add Task</button>
                </div>
            </div>

            <div className=" grid grid-cols-3 w-[1200px] h-[85vh] overflow-x-auto px-16 gap-12  py-6 ">
                <TaskContainer tasks={searchResult} status="TODO" handleTaskUpdate={handleTaskUpdate} />
                <TaskContainer tasks={searchResult} status="INPROGRESS" handleTaskUpdate={handleTaskUpdate} />
                <TaskContainer tasks={searchResult} status="DONE" handleTaskUpdate={handleTaskUpdate} />
            </div>
        </div>
    );
};


export default TaskList;


