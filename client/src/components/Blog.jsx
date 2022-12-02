import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  
  return (
    <Link to={`/blog/${blog._id}`} className='p-3 w-[375px] h-[400px] pb-6 cursor-pointer rounded-[1.25rem]'>
      <div className='w-full h-full'>
         <img src={`http://localhost:5000/images/${blog.photo}`}
           className="w-full h-[300px] object-cover rounded-xl"
         />
      </div>
      <div className='flex flex-col gap-2 items-center justify-center mt-2'>
        <div className='flex items-center px-4 gap-4 mb-2'>
          {blog?.categories?.map((category, idx) => (
            <p key={category} className={`whitespace-nowrap text-white bg-[#3f7415] w-min px-4
            py-2 mt-2 capitalize rounded-[0.75rem] border border-transparent hover:border-[#3f7415] hover:text-[#3f7415] hover:bg-[#fff] ${idx >= 3 && 'hidden'}`}>
             {category}
            </p>
          ))}
        </div>
        <h2 className='font-bold text-[26px]'>{blog?.title}</h2>
        <span className='text-[#999] text-[15px]'>{moment(blog?.createdAt).format('MMM Do YY')}</span>
        <p className='font-semibold mt-4 truncate text-[#777] text-[18px] w-full text-center'>{blog?.desc}</p>
      </div>
    </Link>
  )
}


export default Blog