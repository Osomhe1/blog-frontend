import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PostList = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Posts</h1>
      <div className='flex justify-between items-center '>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='mb-4 p-2 border rounded'
        />
        <Link to='/create' className='text-blue-500'>
          New Post
        </Link>
      </div>

      {filteredPosts.map((post) => (
        <div key={post.id} className='mb-4 p-4 border rounded shadow'>
          <h2 className='text-2xl font-semibold'>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList
