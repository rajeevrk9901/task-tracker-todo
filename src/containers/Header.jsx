import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='h-[10vh] shadow-m px-10 py-3 flex items-center bg-gray-700'>
            <nav>
                <ul className=' flex gap-x-8 items-center'>
                    <Link to="/tasks"><img src="/src/assets/logo.png" alt="Logo" className='w-12' /></Link>
                    <Link to="/tasks" className='font-semibold text-lg text-white hover:text-gray-200'>Tasks</Link>
                    <Link to="/login" className='font-semibold text-lg bg-blue-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600'>Login</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header