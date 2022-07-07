import requests from '@/http/requests'

const locationApis = {
  getAllLocations: async () => {
    const response = await requests.get('/api/v1/locations')

    return response?.data?.data
  }
}

export default locationApis
