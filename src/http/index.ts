import axios, { AxiosResponse } from 'axios'
import configs from '@/configs'

/** Request error handler. */
const handleError = (response: AxiosResponse) => {
  console.error(`[TMGM] Request error: [${response.status}] ${response.data?.message}`)
}

/** Initialise Axios instance. */
const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin-Type': '*',
    'Project-Name': configs.app.name
  },
  timeout: 1000 * 30,
  baseURL: '',
  withCredentials: false
})

/** Use request interceptor. */
instance.interceptors.request.use(
  (requestConfig) => {
    return requestConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** Use response interceptor. */
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error && error.response) {
      // Construct error response
      error.response.data = {
        status: error.response.status,
        success: false,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
        ...error.response.data
      }

      handleError(error.response)

      return Promise.reject(error)
    } else {
      //TODO: Global failed response handler
      alert('Failed to response')
    }
  }
)

export default instance
