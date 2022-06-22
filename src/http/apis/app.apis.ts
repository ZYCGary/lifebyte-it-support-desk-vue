import http from '@/http'

const appApis = {
  getCsrfToken: async () => {
    await http.get('/sanctum/csrf-cookie')
  }
}

export default appApis
