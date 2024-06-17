import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom'
import Auth from './components/Auth'
import CreatePost from './components/CreatePost'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditPost from './components/EditPost'
// import { useNavigate } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  // const navigate = useNavigate()

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
      <ToastContainer />
      <div className='container mx-auto p4'>
        <div
          className={
            token
              ? 'bg-white flex justify-between shadow-md px-4 py-3 mb-2  sticky w-full items-end'
              : ` `
          }
        >
          {token ? (
            <>
              <Link to={`/`}>
                <button
                  type='button'
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5 8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Logout
              </button>
            </>
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
