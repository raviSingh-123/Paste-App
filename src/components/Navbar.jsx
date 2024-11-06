import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='flex flex-row gap-6 place-content-evenly '>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/pastes'>
                Paste
            </NavLink>
        </div>
    )
}

export default Navbar
