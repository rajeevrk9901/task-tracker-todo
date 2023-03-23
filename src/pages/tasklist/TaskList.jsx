import TaskContainer from "./TaskContainer";
import React, { useEffect, useState } from "react";
import axios from "axios";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskReload, setTaskReload] = useState(false);

    const handleTaskUpdate = async (taskId, newStatus) => {
        console.log(taskId, newStatus, 25)
        // Find the task with the given ID and update its status
        const updatedTasks = tasks.map((task) =>
            task._id === parseInt(taskId) ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);

        console.log(`Task ${taskId} status changed to ${newStatus}.`)


        try {
            const response = await axios.put(`http://localhost:9000/api/tasks/${taskId}`, { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                    }
                }

            ).then((response) => {
                console.log(response);
                setTaskReload(!taskReload);
            })
        } catch (error) {
            console.error(error);
        }
        // Make the API call to update the task's status
        // await axios.put(`http://192.168.0.169:9000/api/tasks/${taskId}`, { status: newStatus }).

        //     then((response) =>
        //         console.log(response, 38)
        //     )
        //     .then((data) => console.log(data))
        //     .catch((error) => console.error(error));



    };

    useEffect(() => {
        // i need to get tasks by user id
        axios.get('http://localhost:9000/api/tasks')
            .then((response) => {
                setTasks(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [taskReload]);






    return (
        <div className="grid grid-cols-3 w-full px-24 gap-8 h-full pt-12">
            <TaskContainer tasks={tasks} status="TODO" handleTaskUpdate={handleTaskUpdate} />
            <TaskContainer tasks={tasks} status="INPROGRESS" handleTaskUpdate={handleTaskUpdate} />
            <TaskContainer tasks={tasks} status="DONE" handleTaskUpdate={handleTaskUpdate} />
        </div>

    );
};


export default TaskList;


