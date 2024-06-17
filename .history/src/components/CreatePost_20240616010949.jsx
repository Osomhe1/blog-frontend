/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const CreatePost = ({ token }) => {
  const { register, handleSubmit, watch } = useForm()
  const history = useNavigate()
  const content = watch('content')

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/posts', data, {
        headers: {
          Authorization: token,
        },
      })
      history('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container max-w-xl shadow-md bg-gray-100 px-4 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Create Post</h1>
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
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost
