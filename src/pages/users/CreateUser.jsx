import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const CreateUser = ({ popup }) => {
  // const navigate = useNavigate();


  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  })
 
  const handleData = (e) => {
    const newData = { ...data }
    newData[e.target.id] = e.target.value;
    setData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data);

    axios.post('', data)
      .then((res) => {
        console.log(res.data, 22);
        if (res.data == '') {
          // navigate('')
        }
      })
      .catch((err => {
        console.log(err, 23);
      }))
  }

  return (

    <>
      <div onClick={() => popup(false)} className='h-full top-0 left-0 w-full absolute opacity-40 z-10 bg-black'></div>

      <div className='absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 shadow-2xl'>
        <div className='bg-slate-50 p-6 rounded-lg shodow-md shadow-slate-300 min-w-[400px] max-w-[500px] border-2 border-slate-200'>
          <buton onClick={() => popup(false)} className='flex justify-end '>
            <div className='cursor-pointer relative pr-3 w-6 h-4'>
              <div className='absolute bg-black w-6 h-1 rotate-45'></div>
              <div className='absolute bg-black w-6 h-1 -rotate-45'></div>
            </div>
          </buton>
          <h2 className='uppercase font-bold text-2xl flex items-center justify-center mb-6 text-slate-700'>Create User</h2>
          <form>
            <div>
              <label htmlFor="name" className='text-lg'>Name</label>
              <input value={data.name} onChange={handleData} type="text" name='' id='name' placeholder='Enter your name here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="email" className='text-lg'>Email</label>
              <input value={data.email} onChange={handleData} type="email" name='' id='email' placeholder='Enter your email here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="password" className='text-lg'>Password</label>
              <input value={data.email} onChange={handleData} type="password" name='' id='password' placeholder='Enter your password here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              <label htmlFor="mobile" className='text-l'>Mobile no.</label>
              <input value={data.email} onChange={handleData} type="number" name='' id='mobile' placeholder='Enter your mobile no here' className='h-12 w-full rounded-md border border-slate-300 px-3 bg-transparent outline-blue-400 shadow-sm mb-4' />

              {/* <div className=''>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="file" className='text-sm text-grey-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
            hover:file:cursor-pointer hover:file:opacity-80' />

                <span> Upload image</span>
              </div> */}

              <input value={profileImg} onChange={(e) => setProfileImg(e.target.value)} type="file" id="file" className='hidden' />
              <label for="file" className='flex justify-between items-center'>
                <span className="file"><img src="src/assets/upload_image.png" alt="Image" /></span>
                <span >Upload an Image</span>
              </label>


              {/* <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div> */}


              {/* <div className='flex text-sm justify-between'>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="file" className='text-sm relative left-0 z-10 opacity-0 w-full h-full cursor-pointer' /> 

                <div className='relative right-24  inset-0 w-full h-full flex '>
                  <div className='absolute'>
                    <img src="/src/assets/upload_image.png" alt="" />
                  </div>
                </div>

                <span>upload image</span>
              </div> */}

              {/* <div class="relative group w-full h-10 flex justify-between pr-[100px]">
                <input value={image} onChange={(e) => setImage(e.target.value)} type="file" className="relative z-10 opacity-0 h-full w-full cursor-pointer" />
                <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full m-auto flex items-center justify-center">
                <div class="flex flex-row justify-between absolute top-0 left-0  bottom-0 w-full h-full m-auto items-center ">
                  <img src="/src/assets/upload_image.png" class="sm:w-10 w-10 m-auto" alt="upload image" />
                  <p class="text-gray-700 text-lg">Upload Image</p>
                </div>
                </div>
              </div> */}


              <button onClick={() => handleValidate()} type='submit' className='w-full px-6 py-2 mt-10 m-auto flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer text-gray-100 font-bold text-xl hover:duration-500 hover:scale-95'>Create</button>

              {/* <Link to='/login'>Login</Link> */}

            </div>


          </form>

        </div>
      </div>
    </>

  )
}

export default CreateUser