import React from 'react'

const TaskList = () => {
  return (
    <div className='grid grid-cols-3'>
        <div className='border-2 h-96'>
            <h1>New</h1>

            <div className='border-2'>abc</div>
        </div>

        <div className='border-2 h-96'>
            <h1>In Progress</h1>
        </div>

        <div className='border-2 h-96'>
            <h1>Done</h1>
        </div>
    </div>
  )
}

export default TaskList