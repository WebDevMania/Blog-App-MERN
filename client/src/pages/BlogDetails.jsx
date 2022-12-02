import React from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import moment from 'moment'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {BsFillTrashFill} from 'react-icons/bs'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import { useEffect } from 'react'

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("")
  const [authorData, setAuthorData] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const {
    currentUser: {_id: currentUserId},
    token
  } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const id = useParams().id

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await fetch(`http://localhost:5000/blog/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "GET"
      })
      const data = await res.json()
      setBlogDetails(data)
    }
    fetchBlogDetails()
  }, [id, token])

  useEffect(() => {
    const fetchAuthorData = async() => {
      if(blogDetails){
        const res = await fetch(`http://localhost:5000/user/find/${blogDetails?.userId}`)
        const data = await res.json()
        setAuthorData(data)
      }
    }
    fetchAuthorData()
  }, [blogDetails])

  const handleDeleteBlog = async() => {
    try {
      await fetch(`http://localhost:5000/blog/deleteBlog/${blogDetails?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "DELETE"
      })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='h-[calc(100vh-50px)] mt-16 w-[1100px] mx-auto'>
      <Link to='/' className="flex items-center gap-2 text-[#555] absolute top-[6rem] left-[6rem] cursor-pointer">
         <MdOutlineKeyboardBackspace /> Go Back
      </Link>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h4>Published {moment(blogDetails?.createdAt).format("MMM Do YY")}</h4>
        <h1 className='font-bold text-[#444] text-4xl mb-4'>{blogDetails?.title}</h1>
        <div className='flex items-center px-4 gap-4 mb-2'> 
          {blogDetails?.categories?.map((category, idx) => (
            <p key={category} className={`whitespace-nowrap text-white bg-[#3f7415] w-min px-4
            py-2 mt-2 capitalize rounded-[0.75rem] border border-transparent hover:border-[#3f7415] hover:text-[#3f7415] hover:bg-[#fff] ${idx >= 3 && 'hidden'}`}>
             {category}
            </p>
          ))}
        </div>
        <img 
          src={`http://localhost:5000/images/${blogDetails?.photo}`}
          className="w-1/6 h-[175px] object-cover rounded-xl"
        />
        <div className='flex items-center justify-between w-1/2 px-2'>
            <div>
              Author:{" "}
              <span className='font-semibold capitalize'>
                {authorData?.username}
              </span>
            </div>
            {currentUserId === blogDetails?.userId && (
              <div className='flex gap-2 cursor-pointer'>
                <BsFillTrashFill size={25} onClick={() => setShowDeleteModal(prev => !prev)}/>
              </div>
            )}
            {showDeleteModal && (
              <div className='absolute right-[500px] bottom-[110px] w-[200px] p-2 bg-[#e6dede] pb-6'>
                <div className='text-[18px] font-semibold text-center mb-2'>Are you sure you want to delete this blog?</div>
                <div className='flex gap-4 items-center justify-center'>
                  <button onClick={handleDeleteBlog} className='px-6 py-3 bg-[#f13b5f] hover:bg-[#b61414] text-white rounded-xl'>Yes</button>
                  <button onClick={() => setShowDeleteModal(false)} className='px-6 py-3 bg-[#5fa327] hover:bg-[#3f7415] text-white rounded-xl'>No</button>
                </div>
              </div>
            )}
        </div>
        <div className='flex items-center gap-2 w-1/2 px-2 mt-4'>
          <span className='text-[20px]'>Description: </span>{" "}
          <span className='text-gray-600 capitalize text-[18px] font-semibold truncate'>{blogDetails?.desc}</span>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails