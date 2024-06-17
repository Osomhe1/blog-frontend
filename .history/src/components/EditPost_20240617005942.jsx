/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '../api'

const EditPost = () => {
  const { id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/posts/${id}`)
        setValue('title', response.data.title)
        setValue('content', response.data.content)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.put(`/posts/${id}`, data)
      setLoading(false)
      navigate('/')
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className='container max-w-2xl shadow-lg bg-gray-100 px-3 py-2 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Edit Post</h1>
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : (
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
          <div className='flex justify-between items-center gap-4'>
            <button
              type='button'
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditPost
