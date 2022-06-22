import requests from '@/http/requests'

const userApis = {
  getUserTable: async () => {
    const response = await requests.get('/users')

    return response?.data
  }
}

export default userApis
