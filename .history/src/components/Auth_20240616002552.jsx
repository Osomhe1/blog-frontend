/* eslint-disable react/prop-types */
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = ({ setToken }) => {
  const { register, handleSubmit } = useForm()
  const [isLogin, setIsLogin] = React.useState(true)
  const history = useNavigate()

  const onSubmit = async (data) => {
    const url = isLogin ? '/login' : '/signup'
    try {
      const response = await axios.post(`http://localhost:5000/${url}`, data)

      console.log(response, 'success')
      setToken(response.data.token)
      history('/')
    } catch (err) {
      console.error(err)
    }
  }

  console.log('lllol')

  return (
    <div className='container bg-red-500 mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password')}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button
          type='button'
          onClick={() => setIsLogin(!isLogin)}
          className='ml-4 text-blue-500 hover:underline'
        >
          {isLogin ? 'Need to sign up?' : 'Have an account? Login'}
        </button>
      </form>
    </div>
  )
}

export default Auth
