import React from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const CreateBlog = () => {
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState(null)
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    try {
      let formattedCategories = categories.split(',')
      let trimmedCategories = formattedCategories.map((cat) => {
        return cat.trim()
      })

      let filename = null
      if(file){
        const formData = new FormData()
        filename = Date.now() + file.name
        formData.append('filename', filename)
        formData.append('file', file)

        await fetch(`http://localhost:5000/upload`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "POST",
          body: formData
        })
      }

      const res = await fetch(`http://localhost:5000/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({title, desc, photo: filename, categories: trimmedCategories})
      })

      const blog = await res.json()
      console.log(blog)
      navigate('/')
    } catch (error) {

    }
  }

  return (
    <div className='w-full h-[calc(100vh-50px)] flex items-center justify-center pb-20'>
      <div className='flex flex-col border border-slate-500 rounded-xl p-6 py-12'>
        <h2 className='text-center mb-6 text-3xl font-bold'>Create Blog</h2>
        <form>
          <div className='w-[400px] flex items-center justify-end mb-2'>
            <label className='w-1/4' htmlFor='title'>Title: </label>
            <input onChange={(e) => setTitle(e.target.value)} className='focus:outline-none p-2 w-3/4 rounded-lg border border-transparent focus:border-[#333]' type="text" name='title' id='title' />
          </div>
          <div className='w-[400px] flex items-center justify-end mb-2'>
            <label className='w-1/4' htmlFor='desc'>Description: </label>
            <input onChange={(e) => setDesc(e.target.value)} className='focus:outline-none p-2 w-3/4 rounded-lg border border-transparent focus:border-[#333]' type="text" name='desc' id='desc' />
          </div>
          <div className='w-[400px] flex items-center justify-end mb-2'>
            <label className='w-1/4' htmlFor='file'>Image: </label>
            <input onChange={handleFile} className='focus:outline-none p-2 w-3/4 rounded-lg' type="file" name='file' id='file' />
          </div>
          <div className='w-[400px] flex items-center justify-end mb-2'>
            <label className='w-1/4' htmlFor='categories'>Categories: </label>
            <input onChange={(e) => setCategories(e.target.value)} className='focus:outline-none p-2 w-3/4 rounded-lg border border-transparent focus:border-[#333]' type="text" name='categories' id='categories' placeholder='Separate categories by a comma' />
          </div>
          <div className='flex items-center justify-center mt-8'>
            <button onClick={handleCreateBlog} className='w-3/4 bg-[#cea600] text-white px-4 py-2 rounded-xl 
            border border-transparent hover:border-[#cea600] hover:bg-white hover:text-[#cea600]'>
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog