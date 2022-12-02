import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { currentUser, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
    window.location.reload()
  }

  return (
    <div className='px-6 py-2 bg-[#f0e9e9]'>
      <div className='w-full h-[50px] flex items-center justify-between'>
        {/* left */}
        <Link to="/" className='text-2xl font-bold text-[#444] cursor-pointer'>
          Blog App
        </Link>
        {/* center */}
        <form className='relative flex items-center bg-white px-4 py-2 rounded-xl'>
          <input type="text" placeholder='Search blogs' className='w-[90%] bg-transparent border-b-2 border-transparent focus:outline-0 focus:border-[#999]' />
          <AiOutlineSearch className='cursor-pointer' size={20} />
        </form>
        {/* right */}
        <div className='flex gap-4 cursor-pointer'>
          {currentUser ?
            <>
              <span onClick={handleLogout}>Logout</span>
              <Link to={`/create`}>Create Blog</Link>
              <p>{currentUser?.username}</p>
            </>
            :
            <>
              <Link to="/auth/register">Register</Link>
              <Link to='/auth/login'>Log in</Link>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar