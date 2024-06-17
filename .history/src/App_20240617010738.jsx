import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Auth from './components/Auth'
import CreatePost from './components/CreatePost'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditPost from './components/EditPost'

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
  console.log(token, 'tokem')

  return (
    <Router>
      <ToastContainer />
      <div className='container mx-auto p4'>
        <div className='flex justify-end shadow-md px-4 py-3 bg-white w-full items-end'>
          {token ? (
            <button
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'
            >
              Logout
            </button>
          ) : (
            <Navigate to='/auth' />
          )}
        </div>

        <h1 className='text-4xl font-bold text-center mb-8'>Blog Platform</h1>
        <Routes>
          <Route path='/auth' element={<Auth setToken={handleSetToken} />} />
          <Route
            path='/'
            element={token ? <PostList /> : <Navigate to='/auth' />}
          />
          <Route
            path='/create'
            element={
              token ? <CreatePost token={token} /> : <Navigate to='/auth' />
            }
          />
          <Route
            path='/edit/:id'
            element={
              token ? <EditPost token={token} /> : <Navigate to='/auth' />
            }
          />

          <Route
            path='/posts/:id'
            element={
              token ? <PostDetail token={token} /> : <Navigate to='/auth' />
            }
          />
          <Route path='*' element={<Navigate to={token ? '/' : '/auth'} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
