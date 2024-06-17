import axios from 'axios'

const token = localStorage.getItem('token')
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
  },
})

export default api
