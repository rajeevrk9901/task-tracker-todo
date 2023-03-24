import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const CreateTask = ({ popup }) => {

  const { role } = useContext(AuthContext);

  const [task, setTask] = useState({
    title: '',
    description: '',
    user: ''
  })

  const [users, setUsers] = useState([])

  console.log(users)

  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
      .then((res) => {
        setUsers(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleData = (e) => {
    const newTask = { ...task }
    newTask[e.target.id] = e.target.value;
    setTask(newTask)
    console.log(newTask);
  }

  const handleSubmit = (e) => {

    try {
      axios.post(`http://localhost:9000/api/${role === "USER" ? "tasks" : "admin/task"} `, task,
        {
          headers: {
            application: 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      ).then((res) => {
        console.log(res, "create task response");
        if (res.status === 200) {
          popup(false)
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  return (

    <>

      <div onClick={() => popup(false)} className='h-full top-0 left-0 w-full absolute opacity-40 z-10 bg-black'></div>


      <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-2xl'>
        <button onClick={() => popup(false)} className='flex justify-end absolute right-4 top-10'>
          <div className='cursor-pointer relative pr-3 w-6 h-4'>
            <div className='absolute bg-black w-6 h-1 rotate-45'></div>
            <div className='absolute bg-black w-6 h-1 -rotate-45'></div>
          </div>
        </button>

        <div className='bg-slate-50 p-6 rounded-lg flex-row shodow-md shadow-slate-300 min-w-[400px] max-w-[400px] border-2 border-slate-200'>

          <h2 className='uppercase font-bold text-2xl flex   mb-6 text-slate-700'>Add Task</h2>
          <form>
            <div>
              <label htmlFor="title" className='text-lg'>Title</label>
              <input value={task.title} onChange={handleData} id="title" name='title' type="text" placeholder='Enter Your Email' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />
              {/* <p className='text-red-600 text-sm'>{error.email}</p> */}

              <label htmlFor="description" className='text-lg'>Description</label>
              <textarea value={task.description} onChange={handleData} rows="4" cols="50" id="description" name="description" type="text" placeholder='Enter Description' className=' w-full rounded-md border border-slate-300 px-3 py-2 bg-transparent outline-blue-400 shadow-sm mb-4' />

              {role === 'ADMIN' &&
                <select value={task.user} placeholder="Select User" onChange={handleData} id="user" className='w-full h-10 border-2 rounded-lg text-lg px-2 py-1'>
                  <option value="" selected>Select User</option>

                  {users.map((user) => (
                    <option value={user._id}>{user.name}</option>
                  ))}
                  {/* <option value="user">User</option>
                <option value="user2">User2</option> */}
                </select>
              }
              <button type='button' onClick={() => handleSubmit()} className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create Task Now</button>
            </div>
          </form>
        </div>


      </div>
    </>
  )
}

export default CreateTask