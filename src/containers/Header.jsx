import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate()
    const { role, setRole } = useContext(AuthContext)

    // logout
    const logout = () => {
        localStorage.clear()
        setRole("")
        navigate("/")

    }

    // changing active links
    const navLinkStyles = ({ isActive }) => {
        return{
            fontWeight: isActive ? "Bold" : "normal",
            borderBottom: isActive ? "2px solid blue" : ""
        }
    }


    return (
        <header className='h-[10vh] sticky top-0 shadow-2xl md:px-16 px-5 py-3 bg-gray-700 flex flex-row justify-between'>
            <nav className=''>
                <ul className=' flex md:gap-x-10 gap-x-5 items-center'>
                    <img src="/src/assets/logo.png" alt="Logo" className='w-12 cursor-pointer' />

                    {role && <NavLink to="/tasks" className='font-semibold text-lg text-white hover:text-blue-400' style={navLinkStyles}>Tasks</NavLink>}

                    {(role === 'ADMIN') && <NavLink to="/users" className='font-semibold text-lg text-white hover:text-blue-400' style={navLinkStyles}>Users</NavLink>}
                </ul>
            </nav>

            {/* {(!role === "USER") || (!role === "ADMIN") && */}
            {!role && <button> <Link to="/" className='font-semibold text-lg bg-blue-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600 active:bg-blue-600 border-b-2 hover:border-b-0'>Login</Link> </button>}

            {role && <button onClick={logout}> <Link to="/logout" className='font-semibold text-lg bg-red-400 text-white px-4 py-1 rounded-md outline-none hover:text-gray-600 '>Logout</Link> </button>}
        </header>
    )
}

export default Header