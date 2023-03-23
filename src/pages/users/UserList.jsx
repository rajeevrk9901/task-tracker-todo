import React, { useEffect, useState } from 'react'
import CreateUser from './CreateUser'
import axios from 'axios'

import { BsListTask } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'
import { BiTask } from 'react-icons/bi'


const UserList = () => {
  const [popup, setPopup] = useState(false)
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


  const handlePopup = () => {
    setPopup(true)
  }
  return (
    <div className='flex flex-col h-[85vh] w-full gap-10 '>

      {popup && <CreateUser popup={setPopup} />}
      <div className='flex md:flex-row flex-col justify-between gap-5 px-16 py-8'>
        <div>
          <input type="text" placeholder='Search...' className='outline outline-slate-400 rounded-md px-3 py-2  focus:outline-2 focus:outline-blue-500' />
        </div>

        <button type='button' onClick={handlePopup} className=' w-fit px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create User</button>
      </div>

      {/* userlist */}
      <div className='xl:grid-cols-4 lg:grid-cols-3 grid md:grid-cols-2 sm:grid-cols-1 gap-5 place-items-center overflow-y-auto overflow-x-hidden py-2 px-16'>
        {/* {users.filter(user => user.role != "ADMIN").map((user) => ( */}
        {users.map((user) => (
          <div className='flex flex-row gap-x-5 bg-gray-300 p-5 rounded-lg w-[340px]'>
            <img src="/src/assets/cb.jpg" alt="User Image" className='w-20 h-20 rounded-full border-2' />
            <div>
              <h1 className='text-xl font-semibold'>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
            </div>

            <div className='flex flex-col gap-y-3 w-12'>
              <div className='flex flex-row justify-between items-center gap-x-2'>
                <BsListTask className='text-red-600' /> <span>1</span>
              </div>
              <div className='flex flex-row justify-between items-center gap-x-2'>
                <FcProcess className='text-green-600' /> <span>5</span>
              </div>
              <div className='flex flex-row justify-between items-center gap-x-2'>
                <BiTask className='text-blue-600' /> <span>15</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default UserList