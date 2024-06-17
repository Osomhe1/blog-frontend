/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

const PostList = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))
  const [hoveredPostId, setHoveredPostId] = useState(null)

  useEffect(() => {
    api
      .get('/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Posts</h1>
      <div className='flex justify-between items-center gap4'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='mb-4 p-2 border rounded'
        />

        <button
          onClick={() => navigate('/create')}
          className='bg-blue-500 hover:bg-blue-700 text-white md:font-bold py-2 px-4 rounded'
        >
          New Post
        </button>
      </div>
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className={`post-card mb-4 p-4 border rounded shadow cursor-pointer transition-transform transform ${
            hoveredPostId === post.id
              ? 'scale-105 shadow-lg relative'
              : 'scale-100 shadow-sm'
          }`}
          onMouseEnter={() => setHoveredPostId(post.id)}
          onMouseLeave={() => setHoveredPostId(null)}
        >
          {hoveredPostId === post.id && (
            <div className='absolute inset-0 bg-black bg-opacity-50 z-10 rounded'></div>
          )}
          <div
            className={`relative z-20 ${
              hoveredPostId === post.id ? 'text-white' : 'text-black'
            }`}
          >
            <h2 className='text-2xl font-semibold'>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.content}</p>
            {token && hoveredPostId === post.id && (
              <div className='mt-2'>
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
