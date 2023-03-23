import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CreateUser from './CreateUser'

import { BsListTask } from 'react-icons/bs'
import { FcProcess } from 'react-icons/fc'
import { BiTask } from 'react-icons/bi'



const UserList = () => {
  const [data, setData] = useState([]);

  const [popup, setPopup] = useState(false)


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

      {/* userslist */}
      <div className='xl:grid-cols-4 lg:grid-cols-3 grid md:grid-cols-2 sm:grid-cols-1 gap-5 place-items-center overflow-y-auto overflow-x-hidden py-2 md:px-16 px-5'>
    
        {/* {
          data.map((user) => {
            return ( */}
              <div className='flex flex-row justify-between gap-x-5 bg-gray-300 p-5 rounded-lg'>
                <div className='flex flex-row justify-between gap-x-5'>
                  <img src="/src/assets/cb.jpg" alt="User Image" className='w-20 h-20 rounded-full border-2' />
                  <div>
                    <h1 className='text-xl font-semibold'>Rakesh</h1>
                    <p>rakesh@gmail.com</p>
                    <p>8548459658</p>
                  </div>
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
            {/* )
          })
        } */}
      </div>
    </div>
  )
}

export default UserList