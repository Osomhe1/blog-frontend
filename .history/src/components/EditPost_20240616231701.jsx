/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const EditPost = () => {
  const { id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setValue('title', response.data.title)
      setValue('content', response.data.content)
    })
  }, [id, setValue])

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            {...register('title')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='content'
          >
            Content
          </label>
          <textarea
            id='content'
            {...register('content')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <h3 className='text-xl font-semibold'>Preview</h3>
          <div className='p-4 border rounded'>
            <ReactMarkdown>{setValue.content}</ReactMarkdown>
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default EditPost
