import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://5b79c19dfb11c800145362b0.mockapi.io/',
  responseType: 'json'
})

instance.interceptors.response.use(
  response => {
    if (response.status === 401 || response.status === 403) {
      return Promise.reject("You don't have the permissions")
    }

    return response
  },
  error => {
    console.log('error')
    return Promise.reject(error)
  }
)

export default instance
