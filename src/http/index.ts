import axios, { AxiosResponse } from 'axios'
import configs from '@/configs'
import router from '@/router'
import { store } from '@/store'
import { ElMessage } from 'element-plus/es'

/** Request error handler. */
const handleError = async (response: AxiosResponse) => {
  const status = response.status
  const message = response.data.message

  console.error(`[TMGM] Response error: [${status}] ${message}`)

  switch (status) {
    // Unauthorized
    case 401:
      store.commit('auth/setUser', null)
      store.commit('auth/setAuthenticated', false)

      await router.push({ name: 'auth.login' })

      ElMessage({
        type: 'warning',
        message: 'Session expired, please login again.'
      })

      break

    default:
      break
  }
}

/** Initialise Axios instance. */
const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin-Type': '*',
    'Access-Control-Allow-Credentials': true,
    'Project-Name': configs.app.name
  },
  timeout: 1000 * 30,
  baseURL: '',
  withCredentials: true
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
  async (error) => {
    if (error && error.response) {
      // Construct error response
      error.response.data = {
        status: error.response.status,
        success: false,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
        ...error.response.data
      }

      await handleError(error.response)

      return Promise.reject(error)
    } else {
      //TODO: Global failed response handler
      alert('Failed to response')
    }
  }
)

export default instance
