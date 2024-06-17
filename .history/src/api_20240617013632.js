import axios from 'axios'

const token = localStorage.getItem('token')
const api = axios.create({
  baseURL: 'https://blog-backend-5t0y.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
})

export default api
