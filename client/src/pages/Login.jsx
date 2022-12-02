import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/authRedux'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const isFetching = useSelector((state) => state.auth.isFetching)
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    if( email === "" || password === "") return

    try {
      dispatch(loginStart())
      const res = await fetch(`http://localhost:5000/auth/login`, {
        headers: {
          'Content-Type': "application/json"
        },
        method: "POST",
        body: JSON.stringify({email, password})
      })
      const { token, user } = await res.json()
      console.log(token, user)
      dispatch(loginSuccess({token, user}))
      navigate('/')
    } catch (error) {
      console.error(error.message)
      dispatch(loginFailure())
    }
  }


  return (
    <div className='h-screen w-screen flex items-center justify-center bg-[#6a6ac2] absolute top-0 left-0 z-50'>
      <div className='flex flex-col items-center justify-center bg-[#f4f4f4] p-8 border border-[#a09292] rounded-[30px] h-[475px] w-[375px]'>
        <h2 className='mb-5 text-[#3a3636] font-bold text-[22px]'>Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-5'>
          <label htmlFor='email'>
            <input placeholder='Email...' onChange={(e) => setEmail(e.target.value)} className='py-2 px-5 bg-transparent border-2 border-[#adabab] rounded-[0.75rem] focus:outline-none focus:border-[#333]' type="email" id='email'/>
          </label>
          <label htmlFor='password'>
            <input placeholder='Password...' onChange={(e) => setPassword(e.target.value)} className='py-2 px-5 bg-transparent border-2 border-[#adabab] rounded-[0.75rem] focus:outline-none focus:border-[#333]' type="password" id='password'/>
          </label>
          <button disabled={isFetching} className={`outline-none border border-transparent bg-[#6a6ac2] py-3 px-8 rounded-[20px]
          text-white cursor-pointer mt-3 hover:border-[#6a6ac2] hover:bg-[#fff] hover:text-[#6a6ac2] disabled:bg-gray `}>
            Login
          </button>
          <Link className='text-inherit no-underline' to="/auth/register">
            Don't have an account? <p className='w-[150px] border-b border-[#333] pb-1 my-1 mx-auto text-center hover:text-[#666] hover:border-[#666]'>Register now</p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login