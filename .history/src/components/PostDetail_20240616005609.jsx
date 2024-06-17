/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const PostDetail = ({ token }) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.log(error))
  }, [id])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error))
  }, [id])

  const onSubmit = async (data) => {
    try {
      await axios.post(
        'http://localhost:5000/api/comments',
        { ...data, postId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      reset()
      setComments([
        ...comments,
        { content: data.content, userId: null, postId: id },
      ]) // Simulates the newly added comment
    } catch (err) {
      console.error(err)
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <div className='p-4 border rounded'>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className='mt-4'>
        <h2 className='text-2xl font-bold mb-2'>Comments</h2>
        {comments.map((comment, index) => (
          <div key={index} className='mb-2 p-2 border rounded'>
            {comment.content}
          </div>
        ))}
        {token && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='content'
              >
                Add Comment
              </label>
              <textarea
                id='content'
                {...register('content')}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default PostDetail
