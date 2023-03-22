import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleData = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value;
    setData(newData)
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(data);
    axios.post("http://192.168.0.169:9000/api/login", data)
      .then(res => {
        console.log(res.data);

      }).catch(err => {
        console.log(err);
      })
  }


  return (
    <div className='bg-gray-400 rounded-md shadow-2xl'>
    <div className='flex flex-row justify-center gap-x-2 px-2 py-2'>
      <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 min-w-[400px] max-w-[400px] border-2 border-slate-200'>
        <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='text-lg'>Email</label>
            <input value={data.email} onChange={handleData} id="email" name='email' type="email" placeholder='Enter your email here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

            <label htmlFor="password" className='text-lg'>Password</label>
            <input value={data.password} onChange={handleData} id="password" name="password" type="password" placeholder='Enter your password here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

            <button className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Login</button>
          </div>
        </form>
      </div>

      <div className='md:flex md:flex-col items-center gap-y-5 bg-blue-100 md:p-16 p-5 hidden'>
        <img src="src/assets/tasktracker.svg" alt="" className='w-48 mix-blend-multiply' />
        <h2 className='text-2xl font-bold text-blue-600'>Task Tracker</h2>
        {/* <h3 className='text-xl font-semibold'>Developed by <Link to="https://codebucketlab.com/">Code Bucket Solution Pvt Ltd</Link></h3> */}
      </div>
    </div>
    </div>
  )
}

export default Auth