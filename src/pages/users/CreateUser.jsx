import React from 'react'
// import { Link } from 'react-router-dom'

const CreateUser = ({ popup }) => {
  return (

    <>
      <div onClick={() => popup(false)} className='h-full top-0 left-0 w-full absolute opacity-40 z-10 bg-black'></div>

      <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-2xl'>
        <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 min-w-[400px] max-w-[500px] border-2 border-slate-200'>
          <buton onClick={()=>popup(false)} className='flex justify-end '>
            <div  className='cursor-pointer relative pr-3 w-6 h-4'>
              <div className='absolute bg-black w-6 h-1 rotate-45'></div>
              <div className='absolute bg-black w-6 h-1 -rotate-45'></div>
            </div>
          </buton>
          <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Create User</h2>
          <form action="">
            <div>
              <label htmlFor="name" className='text-lg'>Name</label>
              <input type="text" name='' id='name' placeholder='Enter your name here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="email" className='text-lg'>Email</label>
              <input type="email" name='' id='email' placeholder='Enter your email here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="password" className='text-lg'>Password</label>
              <input type="password" name='' id='password' placeholder='Enter your password here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="mobile" className='text-l'>Mobile no.</label>
              <input type="number" name='' id='mobile' placeholder='Enter your mobile no here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <div className='flex text-sm justify-between'>
                <input type="file" className='text-sm' /> <span>upload image</span>
              </div>


              <button className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create</button>

              {/* <Link to='/login'>Login</Link> */}

            </div>


          </form>

        </div>
      </div>
    </>

  )
}

export default CreateUser