import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Toast from '../../components/toast/Toast'
import api from '../../utils/ApiServices'

const CreateTask = ({ popup, setPopup }) => {

  const { role } = useContext(AuthContext);

  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false);

  const [task, setTask] = useState({
    title: '',
    description: '',
    user: ''
  })

  const [users, setUsers] = useState([])

  // console.log(users)

  role === "ADMIN" &&
    useEffect(() => {
      api.get('users',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
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
    // console.log(newTask);
  }

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleSubmit = async (e) => {

    try {
      await api.post(`${role === "USER" ? "tasks" : "admin/task"} `, task,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
        .then((res) => {
          // console.log(res, "create task response");
          setMessage("Task Created !")
          setShowToast(true)
          if (res.status === 200) {
            popup(false)
          }
        })
    }
    catch (error) {
      setMessage("Server Error : Task Not Created !")
      setShowToast(true)
      console.log(error)
    }
  }

  return (

    <>

      <div onClick={() => popup(false)} className='h-full top-0 left-0 w-full absolute opacity-40 z-10 bg-black'></div>

      {showToast && <Toast message={message} onClose={handleToastClose} />}


      <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-2xl'>
        <div className='bg-slate-50 p-6 rounded-lg flex-row shodow-md shadow-slate-300 min-w-[350px] max-w-[400px] border-2 border-slate-200'>
          <button onClick={() => popup(false)} className='flex justify-end shadow-2xl'>

            <div className='cursor-pointer relative pr-3 w-6 h-4'>
              <div className='absolute bg-red-600  w-6 h-1 rotate-45'></div>
              <div className='absolute bg-red-600  w-6 h-1 -rotate-45'></div>
            </div>

          </button>



          <h2 className='uppercase font-bold text-2xl flex mb-6 text-slate-700 border-b-2 border-b-orange-400 w-fit'>Add Task</h2>
          <form>
            <div>
              <label htmlFor="title" className='text-lg'>Title</label>
              <input value={task.title} onChange={handleData} id="title" name='title' type="text" placeholder='Enter Task Title' className='h-12 w-full rounded-md px-3 bg-transparent shadow-sm border-2 border-blue-500  focus:border-2 focus:border-yellow-700 outline-none' />
              {/* <p className='text-red-600 text-sm'>{error.email}</p> */}

              <div className='mt-5'>
                <label htmlFor="description" className='text-lg '>Description</label>
                <textarea value={task.description} onChange={handleData} rows="3" cols="50" id="description" name="description" type="text" placeholder='Enter Task Description' className=' w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none' />
              </div>

              {role === 'ADMIN' &&
                <select value={task.user} placeholder="Select User" onChange={handleData} id="user" className='w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none mt-5'>
                  <option value="" defaultValue={"Select User"} >Select User</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                  {/* <option value="user">User</option>
                <option value="user2">User2</option> */}
                </select>
              }
              <button type='button' onClick={() => handleSubmit()} className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95 uppercase'>Create Task Now</button>
            </div>
          </form>
        </div>


      </div>
    </>
  )
}

export default CreateTask