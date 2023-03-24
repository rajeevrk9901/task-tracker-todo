
import React, { useEffect, useState } from 'react'

import CreateUser from './CreateUser'
import axios from 'axios'

import { BsListTask } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'
import { BiTask } from 'react-icons/bi'



const UserList = () => {
  const [data, setData] = useState([]);

  const [popup, setPopup] = useState(false)
  const [users, setUsers] = useState([])

  const [stat, setStat] = useState([])

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


  // http://192.168.0.169:9000/api/status
  useEffect(() => {
    axios.get('http://localhost:9000/api/status')
      .then((res) => {
        setStat(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  // opup the create user form
  const handlePopup = () => {
    setPopup(true)
  }


  // fetching data from api
  useEffect(() => {
    console.log(data);

    axios.get('http://localhost:9000', {
      // headers: {
      //   "Authorization": `Bearer ${token}`
      // }
    })
      .then((res) => {
        console.log(res, 29);
        setData([res.data]);
      })
      .catch((err) => {
        console.log(err, 32)
      })

  }, [])

  return (
    <div className='flex flex-col h-[85vh] w-full gap-10 '>

      {popup && <CreateUser popup={setPopup} />}
      <div className='flex flex-row justify-between gap-5 md:px-16 px-5 py-8'>
        <div>
          <input type="text" placeholder='Search...' className='outline outline-slate-400 rounded-md px-3 py-2  focus:outline-2 focus:outline-blue-500' />
        </div>

        <button type='button' onClick={handlePopup} className=' w-fit md:px-6 px-3 md:py-2 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold md:text-xl text-base hover:duration-500 hover:scale-95'>Create User</button>
      </div>

      {/* userlist */}
      <div className='2xl:grid-cols-4 lg:grid-cols-3 grid md:grid-cols-2 sm:grid-cols-1 gap-10 place-items-center overflow-y-auto overflow-x-hidden py-2 md:px-16 px-5 scrollbar'>
        {users.map((user) => (
          <div className='flex flex-col gap-6 bg-gray-300 shadow-2xl p-5 rounded-lg gap-y-5 min-w-[320px] max-w-[350px]' key={user.id}>
            <div className='flex flex-row gap-x-5'>
              <img src="/src/assets/cb.jpg" alt="User Image" className='w-20 h-20 rounded-full border-2' />
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-xl font-bold text-blue-900'>{user.name}</h1>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
              </div>
            </div>

            {stat.filter((st) => st.user === user.name).map((filteredStat) => (
              <div className='flex flex-row gap-y-3 w-12 gap-x-5' key={filteredStat.id}>
                <div className='flex flex-col justify-between items-center gap-y-2'>
                  <BsListTask className='text-red-600' /> <span>{filteredStat.todoCount}</span>
                </div>
                <div className='flex flex-col justify-between items-center gap-y-2'>
                  <FcProcess className='text-green-600' /> <span>{filteredStat.inprogressCount}</span>
                </div>
                <div className='flex flex-col justify-between items-center gap-y-2'>
                  <BiTask className='text-blue-600' /> <span>{filteredStat.doneCount}</span>
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}

export default UserList