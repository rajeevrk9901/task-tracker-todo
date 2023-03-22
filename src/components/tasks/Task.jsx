import React from 'react'

const Task = () => {

    const dragStarted = (e, id)=>{
        console.log("Drag...");
        e.dataTransfer.setData("todo", id)
    }
  return (
    <div draggable onDragStart={(e)=>dragStarted(e)} className='bg-blue-400'>
        hiiiii
    </div>
  )
}

export default Task