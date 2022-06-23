import http from '@/http'

const authApis = {
  login: async (form: { email: string; password: string }) => {
    await http.post('api/v1/login', {
      email: form.email,
      password: form.password,
      is_admin: 1
    })
  },

  getCurrentUser: async () => {
    const response = await http.get('api/v1/user')

    return response?.data
  },

  logout: async () => {
    await http.post('api/v1/logout')
  }
}

export default authApis
