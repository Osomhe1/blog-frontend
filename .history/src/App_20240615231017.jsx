import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import CreatePost from './components/CreatePost'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleSetToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('token', newToken)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <div className='container mx-auto p-4'>
        <h1 className='text-4xl font-bold text-center mb-8'>Blog Platform</h1>
        {token ? (
          <button
            onClick={handleLogout}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'
          >
            Logout
          </button>
        ) : (
          <Route
            path='/auth'
            render={() => <Auth setToken={handleSetToken} />}
          />
        )}
        <Routes>
          <Route path='/' exact component={PostList} />
          {token && (
            <Route path='/create' render={() => <CreatePost token={token} />} />
          )}
          <Route
            path='/posts/:id'
            render={() => <PostDetail token={token} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
