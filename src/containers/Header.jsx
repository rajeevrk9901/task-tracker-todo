import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate()
    const { role, setRole } = useContext(AuthContext)

    const logout = () => {
        localStorage.clear()
        setRole("")
        navigate("/login")

    }

    return (
        <header className='h-[10vh] shadow-2xl px-16 py-3 bg-gray-700 flex flex-row justify-between'>
            <nav className=''>
                <ul className=' flex gap-x-10 items-center'>
                    <Link to="/tasks"><img src="/src/assets/logo.png" alt="Logo" className='w-12' /></Link>
                    <Link to="/tasks" className='font-semibold text-lg text-white hover:text-blue-400'>Tasks</Link>

                    {(role === 'ADMIN') &&
                        <Link to="/users" className='font-semibold text-lg text-white hover:text-blue-400'>Users</Link>
                    }
                </ul>
            </nav>

            {/* {(!role === "USER") || (!role === "ADMIN") && */}
            {!role &&
                <button>
                    <Link to="/login" className='font-semibold text-lg bg-blue-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600 '>Login</Link>
                </button>
            }

            {role &&
                <button onClick={logout}>
                    <Link to="/logout" className='font-semibold text-lg bg-red-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600 '>Logout</Link>
                </button>
            }
        </header>
    )
}

export default Header