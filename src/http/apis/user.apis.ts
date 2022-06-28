import requests from '@/http/requests'

const userApis = {
  getUserTable: async (params?: { page?: number; name?: string }) => {
    const response = await requests.get('api/v1/users', params)

    return response?.data
  },
  getUser: async (userId: number) => {
    const response = await requests.get(`api/v1/users/${userId}`)

    return response?.data
  },
  createUser: async (payload: any) => {
    await requests.post('api/v1/users', payload)
  }
}

export default userApis
