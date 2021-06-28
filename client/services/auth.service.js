import axios from 'axios'
import store from '../store'

const baseURL = process.env.HOST_API
const config = {
  'Content-Type': 'application/json'
}

export default {
  async login (email, password) {
    let userCredentials = {
      email,
      password
    }

    const response = await axios.post(`${baseURL}/auth/login`, userCredentials, config)
    
    if (response.status == 200) {
      return response.data
    } 
  }
}