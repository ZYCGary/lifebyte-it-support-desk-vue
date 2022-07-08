import { reactive } from 'vue'
import { User, UserFilter } from '@/types/store/user.module.type'
import apis from '@/http/apis'
import { BasePaginationProps } from '@/types/components.type'

const useUser = () => {
  const loading = reactive({
    collection: false,
    show: false,
    store: false,
    update: false
  })
  const error = reactive({
    collection: false,
    show: false,
    store: false,
    update: false
  })

  const getUserCollection = async (
    filter?: UserFilter
  ): Promise<{
    data: User[]
    pagination: BasePaginationProps
  }> => {
    try {
      loading.collection = true
      error.collection = false

      const list = await apis.user.index(filter)

      loading.collection = false
      error.collection = false

      return {
        data: list?.data,
        pagination: {
          links: list?.links,
          meta: list?.meta
        }
      }
    } catch (err) {
      loading.collection = false
      error.collection = true

      throw err
    }
  }

  const getUserById = async (id: number): Promise<User> => {
    try {
      loading.show = true
      error.show = false

      const response = await apis.user.show(id)

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

      await apis.user.update(id, payload)

      loading.update = false
      error.update = false
    } catch (err) {
      loading.update = false
      error.update = true

      throw err
    }
  }
  return { loading, error, getUserCollection, getUserById, updateUser }
}

export default useUser
