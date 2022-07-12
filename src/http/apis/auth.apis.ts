import http from '@/http'

const authApis = {
  login: async (form: { email: string; password: string }) => {
    await http.post('/login', {
      email: form.email,
      password: form.password,
      is_admin: 1
    })
  },

  getCurrentUser: async () => {
    const response = await http.get('/api/v1/user')

    return response?.data
  },

  logout: async () => {
    await http.post('/logout')
  }
}

export default authApis
