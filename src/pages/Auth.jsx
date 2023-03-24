import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Auth = () => {
  const navigate = useNavigate()

  const { setRole } = useContext(AuthContext)

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState({})

  const handleData = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value;
    setData(newData)
  }

  const validateFrom = () => {
    let err = {};
    if (data.email === '') {
      err.email = 'Email Required'
    } else {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!emailRegex.test(data.email)) {
        err.email = 'Email Not Valid'
      }
    }


      if (data.password === '') {
        err.password = 'Password required'
      }
      // else{
      //   let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      //   if(!passRegex.test(data.password)){
      //     err.password = 'Password must be a character and number'
      //   }
      // }


    if(data.password === ''){
      err.password = 'Password Required'

    }
    // else{
    //   let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    //   if(!passRegex.test(data.password)){
    //     err.password = 'Password must be greater than 8 or a Character and Number'
    //   }
    // }

    setError({ ...err })
    return Object.keys(err).length > 0 ? false : true
  }

  const handleValidate = () => {
    let isValid = validateFrom()
    isValid && handleSubmit();
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(data);
    axios.post("http://localhost:9000/api/login", data)
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/tasks")
          localStorage.setItem("role", res.data.role)
          localStorage.setItem("token", res.data.token)
          setRole(res.data.role)
        }

      }).catch(err => {
        console.log(err);
      })
  }



  return (
      
    <div className='bg-gray-400 rounded-md shadow-2xl mx-4'>
    <div className='flex md:flex-row flex-col-reverse justify-center md:gap-x-2 gap-y-2 px-2 py-2'>
      <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 md:w-[400px] w-[100%] border-2 border-slate-200'>
        <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Login</h2>
        <form>
          <div>
            <label htmlFor="email" className='text-lg'>Email</label>
            <input value={data.email} onChange={handleData} id="email" name='email' type="email" placeholder='Enter Your Email' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />
            <p className='text-red-600 text-sm'>{error.email}</p>

            <label htmlFor="password" className='text-lg'>Password</label>
            <input value={data.password} onChange={handleData} id="password" name="password" type="password" placeholder='Enter Your Password' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />
            <p className='text-red-600 text-sm'>{error.password}</p>

            <button type='button' onClick={() => handleValidate()} className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Login</button>
          </div>
        </form>
      </div>

      <div className='flex md:flex-col flex-row items-center justify-between md:gap-y-5 bg-blue-100 md:p-16 p-5'>
        <img src="src/assets/tasktracker.svg" alt="" className='md:w-48 w-20 mix-blend-multiply' />
        <h2 className='text-2xl font-bold text-blue-600'>Task Tracker</h2>
        {/* <h3 className='text-xl font-semibold'>Developed by <Link to="https://codebucketlab.com/">Code Bucket Solution Pvt Ltd</Link></h3> */}
      </div>
    </div>

    </div>
  )
}

export default Auth