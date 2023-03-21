import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  // const navigate = useNavigate();

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
    <div className='flex flex-col items-center mt-10'>
      <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 min-w-[400px] max-w-[500px] border-2 border-slate-200'>
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
    </div>
  )
}

export default Auth