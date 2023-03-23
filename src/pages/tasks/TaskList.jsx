import React, { useState } from "react";
import Task from "../../components/tasks/Task";

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "TODO" },
    { id: 2, title: "Task 2", status: "INPROGRESS" },
    { id: 3, title: "Task 3", status: "DONE" },
  ]);

  const handleStatusChange = (taskId, newStatus) => {
    // Find the task with the given ID and update its status
    const updatedTasks = tasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    console.log(`Task ${taskId} status changed to ${newStatus}.`)

    // Make the API call to update the task's status
    // fetch(`/api/tasks/${taskId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ status: newStatus }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  };

  return (
    <div className="w-screen">
      <h1>Task List</h1>
      <div className="grid grid-cols-3 gap-4 min-w-screen place-items-center">
        <div>
          <h2>TODO</h2>
          {tasks
            .filter((task) => task.status === "TODO")
            .map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                onStatusChange={handleStatusChange}
              />
            ))}
        </div>
        <div>
          <h2>In Progress</h2>
          {tasks
            .filter((task) => task.status === "INPROGRESS")
            .map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                onStatusChange={handleStatusChange}
              />
            ))}
        </div>
        <div>
          <h2>DONE</h2>
          {tasks
            .filter
            ((task) => task.status === "DONE")
            .map((task) => (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                status={task.status}
                onStatusChange={handleStatusChange}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;