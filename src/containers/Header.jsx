import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='h-[10vh] shadow-2xl px-16 py-3 bg-gray-700 flex flex-row justify-between'>
            <nav className=''>
                <ul className=' flex gap-x-10 items-center'>
                    <Link to="/tasks"><img src="/src/assets/logo.png" alt="Logo" className='w-12' /></Link>
                    <Link to="/tasks" className='font-semibold text-lg text-white hover:text-blue-400'>Tasks</Link>
                    <Link to="/users" className='font-semibold text-lg text-white hover:text-blue-400'>Users</Link>
                </ul>
            </nav>

            <button>
                <Link to="/login" className='font-semibold text-lg bg-blue-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600 '>Login</Link>
            </button>
        </header>
    )
}

export default Header