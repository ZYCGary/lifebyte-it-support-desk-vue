import requests from '@/http/requests'

const userApis = {
  getUserCollection: async (params?: { page?: number; name?: string }) => {
    const response = await requests.get('api/v1/users', params)

    return response?.data
  }
}

export default userApis
