import requests from '@/http/requests'

const userApis = {
  index: async (params?: Object) => {
    const response = await requests.get('/api/v1/users', params)

    return response?.data
  },
  show: async (userId: number) => {
    const response = await requests.get(`/api/v1/users/${userId}`)

    return response?.data
  },
  store: async (payload: any) => {
    const response = await requests.post('/api/v1/users', payload)

    return response?.data
  },
  update: async (id: number, payload: any) => {
    await requests.put(`/api/v1/users/${id}`, payload)
  },
  export: async () => {
    const response = await requests.get('/api/v1/users/export', {}, { responseType: 'blob' })

    return response?.data
  }
}

export default userApis
