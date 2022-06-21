import requests from '@/http/requests'

const appApis = {
  getEmployeeList: async () => {
    const response = await requests.get('/employees')

    return response?.data
  }
}

export default appApis
