import React, { useState } from 'react'

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    user: ''
  })

  const handleData = (e)=>{
    const newTask = { ...task }
    newTask[e.target.id] = e.target.value;
    setTask(newTask)
    console.log(newTask);
  }

  return (
    
      <div className='flex flex-row justify-center gap-x-2 px-2 py-2'>
        <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 min-w-[400px] max-w-[400px] border-2 border-slate-200'>
          <h2 className='uppercase font-bold text-2xl flex   mb-6 text-slate-700'>Add Task</h2>
          <form>
            <div>
              <label htmlFor="title" className='text-lg'>Title</label>
              <input value={task.title} onChange={handleData} id="title" name='title' type="text" placeholder='Enter Your Email' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />
              {/* <p className='text-red-600 text-sm'>{error.email}</p> */}

              <label htmlFor="description" className='text-lg'>Description</label>
              <textarea value={task.description} onChange={handleData} rows="4" cols="50"  id="description" name="description" type="text" placeholder='Enter Description' className=' w-full rounded-md border border-slate-300 px-3 py-2 bg-transparent outline-blue-400 shadow-sm mb-4' />
             
             <select value={task.user} placeholder="Select User" onChange={handleData} id="user" className='w-full h-10 border-2 rounded-lg text-lg px-2 py-1'>
                  <option value="" selected>Select User</option>
                  <option value="user">User</option>
                  <option value="user2">User2</option>
             </select>

              <button type='button' onClick={() => handleValidate()} className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Login</button>
            </div>
          </form>
        </div>

        
      </div>
  )
}

export default CreateTask