import requests from '@/http/requests'

const userApis = {
  getUserCollection: async (params?: { page?: number; name?: string }) => {
    const response = await requests.get('api/v1/users', params)

    return response?.data
  },
  createUser: async (payload: any) => {
    const response = await requests.post('api/v1/users', payload)

    return response?.data
  }
}

export default userApis
