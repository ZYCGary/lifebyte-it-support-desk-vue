import http from '@/http'

const authApis = {
  login: async (form: { email: string; password: string }) => {
    const response = await http.post('api/v1/login', {
      email: form.email,
      password: form.password,
      is_admin: 1
    })

    return response?.data
  },

  getCurrentUser: async () => {
    const response = await http.get('api/v1/user')

    return response?.data
  }
}

export default authApis
