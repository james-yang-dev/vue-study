import axios from 'axios'
const API_URL = 'http://localhost:7979/'

const createRequest = config => {
  const instance = axios.create()
  instance.defaults.headers['Accept'] = 'application/json'
  instance.defaults.headers['Content-Type'] = 'application/json'
  instance.defaults.baseURL = API_URL

  return instance(config)
    .then(res => Promise.resolve(res.data))
    .catch(err => {
      console.log(err)
      return Promise.reject({ err: err })
    })
}

export default createRequest
