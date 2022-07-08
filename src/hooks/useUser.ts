import { reactive } from 'vue'
import { User } from '@/types/store/user.module.type'
import apis from '@/http/apis'

const useUser = () => {
  const loading = reactive({
    table: false,
    all: false,
    show: false,
    store: false,
    update: false
  })
  const error = reactive({
    table: false,
    all: false,
    show: false,
    store: false,
    update: false
  })

  const getUserById = async (id: number): Promise<User> => {
    try {
      loading.show = true
      error.show = false

      const response = await apis.user.getUser(id)

      loading.show = false
      error.show = false

      return response?.data as User
    } catch (err) {
      loading.show = false
      error.show = true

      throw err
    }
  }

  const updateUser = async (id: number, payload: object): Promise<void> => {
    try {
      loading.update = true
      error.update = false

      await apis.user.updateUser(id, payload)

      loading.update = false
      error.update = false
    } catch (err) {
      loading.update = false
      error.update = true

      throw err
    }
  }
  return { loading, error, getUserById, updateUser }
}

export default useUser
