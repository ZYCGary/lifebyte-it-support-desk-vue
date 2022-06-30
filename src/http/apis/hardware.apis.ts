import requests from '@/http/requests'

const hardwareApis = {
  getHardwareCollection: async (params?: {}) => {
    const response = await requests.get('api/v1/hardware', params)

    return response.data
  }
}

export default hardwareApis
