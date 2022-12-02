import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Blog from './Blog'

const Blogs = () => {
   const [blogs, setBlogs] = useState([])

   useEffect(() => {
     const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blog/getAll`)
        const data = await res.json()
        setBlogs(data)
      } catch (error) {
        console.error(error.message)
      }
     }
     fetchBlogs()
   }, [])
   console.log(blogs)
  return (
    <div className='flex flex-wrap gap-20'>
      {blogs?.map((b) => (
        <Blog key={b._id} blog={b} />
      ))}
    </div>
  )
}

export default Blogs