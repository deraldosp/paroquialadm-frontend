import axios from 'axios'

const baseURL = process.env.HOST_API

const Service = (config) => {
 
  if (localStorage.getItem('jwt')) {

    let jwtToken = localStorage.getItem('jwt')
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    }
  
    let http = axios.create({
      baseURL,
      timeout: 30000,
      headers
    })
  
    return http
  }

}

export default Service