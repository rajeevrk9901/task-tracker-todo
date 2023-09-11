import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Toast from '../components/toast/Toast'
import api from '../utils/ApiServices'
import styled, { css } from 'styled-components';

const Auth = () => {
  const navigate = useNavigate()

  const { setRole, setToken } = useContext(AuthContext)
  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // const validateFrom = () => {
  //   let err = {};
  //   if (data.email === '') {
  //     err.email = 'Email Required'
  //   } else {
  //     let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  //     if (!emailRegex.test(data.email)) {
  //       err.email = 'Email Not Valid'
  //     }
  //   }

  //   if (data.password === '') {
  //     err.password = 'Password Required'

  //   }
  //   // else{
  //   //   let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  //   //   if(!passRegex.test(data.password)){
  //   //     err.password = 'Password must be greater than 8 or a Character and Number'
  //   //   }
  //   // }

  //   setError({ ...err })
  //   return Object.keys(err).length > 0 ? false : true
  // }

  // const handleValidate = () => {
  //   let isValid = validateFrom()
  //   isValid && handleSubmit();
  // }

  // Define a styled component for the fieldset
  const StyledFieldset = styled.fieldset`
  /* Common styles for the fieldset when not disabled */
  border: 1px solid #ccc;
  padding: 16px;

  /* Conditionally apply styles when disabled */
  ${(props) =>
      props.disabled &&
      css`
      opacity: 0.5;
      cursor: not-allowed;
    
      /* Target all input elements within nested div elements */
      & div input {
        background-color: #f2f2f2;
        cursor: not-allowed;
      }
    `}
`;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(data);
    if (data.email === '' || data.password === '') {
      setMessage("All fields are required");
      setShowToast(true);
      return;
    }

    try {
      // Set loading state to true before making the API request
      setIsLoading(true);

      const response = await api.post("login", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      setRole(response.data.role);
      setToken(response.data.token);
      // console.log(response.data.token, response.data.name, 80);
      navigate("/tasks");
    } catch (err) {
      setMessage(err.response.data.message);
      setShowToast(true);
      console.error(err, 81);
    } finally {
      // Set loading state to false after the API request (whether successful or not)
      setIsLoading(false);
    }
  };


  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleGuestLogin = async () => {
    setData({
      email: "amit@gmail.com",
      password: "amit"
    });

  }




  return (

    <div className='bg-slate-50 rounded-md shadow-2xl mx-4'>
      {showToast && <Toast message={message} onClose={handleToastClose} />}

      <div className='flex md:flex-row flex-col-reverse justify-center'>
        <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 md:w-[400px] w-[100%] border-2 border-slate-200'>
          <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Login</h2>
          <form >
            <StyledFieldset disabled={isLoading}>
              <div>
                <div className='mt-2'>
                  <label htmlFor="email" className='text-lg'>Email</label>
                  <input value={data.email} onChange={handleData} id="email" name='email' type="email" placeholder='Enter Your Email' className='w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none' />
                  <p className='text-red-600 text-sm'>{error.email}</p>
                </div>

                <div className='mt-5'>
                  <label htmlFor="password" className='text-lg'>Password</label>
                  <input value={data.password} onChange={handleData} id="password" name="password" type="password" placeholder='Enter Your Password' className='w-full rounded-md py-2 px-3 bg-transparent shadow-sm  border-2 border-blue-500 focus:border-2 focus:border-yellow-700 outline-none' />
                  <p className='text-red-600 text-sm'>{error.password}</p>
                </div>

                {/* <button type='button' onClick={handleSubmit} className='w-full px-6 py-2 mt-5 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Login</button> */}

                <button type="button" onClick={handleSubmit} className="w-full px-6 py-2 mt-5 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95" disabled={isLoading}>
                  <div className={`relative inline-block w-5 h-5 mr-2 ${!isLoading ? "hidden" : ""}`}>
                    <div className="right-0 w-full h-full animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-safe:animate-spin"></div>
                  </div>
                  <span className="inline"> {!isLoading ? "Login" : "Loading..."}</span>
                </button>

                <button type='button' onClick={handleGuestLogin} className='w-full px-4 py-1 mt-5 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-gray-500 to-slate-500 cursor-pointer text-gray-100  hover:duration-500 hover:scale-95'>Guest Login</button>
              </div>
            </StyledFieldset>
          </form>
        </div>

        <div className='flex md:flex-col flex-row items-center justify-between md:gap-y-5 bg-blue-100 md:p-16 p-5'>
          <img src="https://res.cloudinary.com/dhdmdlywv/image/upload/v1679811784/task-tracker/assets/tasktracker_irnqge.svg" alt="" className='md:w-48 w-20 mix-blend-multiply' />
          <h2 className='text-2xl font-bold text-blue-600'>Task Tracker</h2>
          {/* <h3 className='text-xl font-semibold'>Developed by <Link to="https://codebucketlab.com/">Code Bucket Solution Pvt Ltd</Link></h3> */}
        </div>
      </div>

    </div>
  )
}

export default Auth