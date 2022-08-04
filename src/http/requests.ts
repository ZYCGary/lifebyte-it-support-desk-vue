/** Encapsulate Axios requests. */
import { AxiosRequestConfig } from 'axios'
import http from '@/http'

export default {
  get: async (url: string, params?: any, config?: AxiosRequestConfig) => {
    try {
      return await http.get(url, { params: params, ...config })
    } catch (error) {
      console.error('[TMGM] GET request error:\n', error)
      throw error
    }
  },

  post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await http.post(url, data, { ...config })
    } catch (error) {
      console.error('[TMGM] POST request error:\n', error)
      throw error
    }
  },

  put: async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await http.put(url, data, { ...config })
    } catch (error) {
      console.error('[TMGM] PUT request error:\n', error)
      throw error
    }
  },

  delete: async (url: string, config?: AxiosRequestConfig) => {
    try {
      return await http.delete(url, { ...config })
    } catch (error) {
      console.error('[TMGM] DELETE request error:\n', error)
      throw error
    }
  }
}
