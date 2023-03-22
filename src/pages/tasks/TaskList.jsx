import React from 'react'
import Task from '../../components/tasks/Task'

const TaskList = () => {

  const draggingOver = (e)=> {
    e.preventDefault();
    console.log("Drag now...");
  }

  const dragDropped = (e)=> {
    console.log("dropped...");
    let transferedTodoId = e.dataTransfer
  }
  return (
    <div className='grid grid-cols-3'>
        <div className='border-2 h-96'>
            <h1>New</h1>

            <Task />
        </div>

        <div droppable onDragOver={(e)=>draggingOver(e)} onDrop={(e)=>dragDropped(e)} className='border-2 h-96'>
            <h1>In Progress</h1>
        </div>

        <div className='border-2 h-96'>
            <h1>Done</h1>
        </div>
    </div>
  )
}

export default TaskList