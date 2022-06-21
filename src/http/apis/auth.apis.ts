import http from '@/http'

const authApis = {
  login: async (email: string, password: string) => {
    const response = await http.post('/login', {
      email: email,
      password: password
    })

    return response?.data
  }
}

export default authApis
