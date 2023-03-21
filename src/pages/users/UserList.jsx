import React from 'react'

const UserList = () => {
  return (
    <div>
    <div className='flex justify-end mx-16'>
    <button className=' w-fit px-6 py-2 mt-10 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create User</button> 
    </div>

    <div className='flex flex-col items-center mt-16'>
        <ul className='flex flex-row items-center gap-x-5 font-semibold border-b-2  border-b-slate-300 pl-3 h-12'>
            <li className='text-xl w-60'>Name</li>
            <li className='text-xl w-72'>Email</li>
            <li className='text-xl w-48'>Mobile no</li>
        </ul>

        <ul className='flex flex-row items-center gap-x-5 border-b-2  border-b-slate-300 pl-3 h-12'>
            <li className='text-xl w-60'>Rohan</li>
            <li className='text-xl w-72'>email@gmail.com</li>
            <li className='text-xl w-48'>9854875698</li>
        </ul>
    </div>
    </div>
  )
}

export default UserList