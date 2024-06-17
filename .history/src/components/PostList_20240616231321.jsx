/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const PostList = ({ token }) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      })
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
  console.log(token, 'token')
  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Posts</h1>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4 p-2 border rounded'
      />
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className='mb-4 p-4 border cursor-pointer rounded shadow'
        >
          <h2 className='text-2xl font-semibold'>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.content}</p>
          {token && (
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
      ))}
    </div>
  )
}

export default PostList
