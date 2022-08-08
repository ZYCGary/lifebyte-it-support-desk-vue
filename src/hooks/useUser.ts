import { reactive } from 'vue'
import { User, UserFilter } from '@/types/store/user.module.type'
import apis from '@/http/apis'
import { BasePaginationProps } from '@/types/components.type'
import downloadFile from '@/utils/download-file'

const useUser = () => {
  const loading = reactive({
    collection: false,
    show: false,
    store: false,
    update: false,
    dismiss: false,
    export: false,
    statistics: false
  })
  const error = reactive({
    collection: false,
    show: false,
    store: false,
    update: false,
    dismiss: false,
    export: false,
    statistics: false
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

  const createUser = async (payload: object): Promise<User> => {
    try {
      loading.store = true
      error.store = false

      const user = await apis.user.store(payload)

      loading.store = false
      error.store = false

      return user
    } catch (err) {
      loading.store = false
      error.store = true

      throw err
    }
  }

  const dismissUser = async (userId: number): Promise<void> => {
    try {
      loading.dismiss = true
      error.dismiss = true

      await apis.user.update(userId, { state: 0 })

      loading.dismiss = false
      error.dismiss = false
    } catch (err) {
      loading.dismiss = false
      error.dismiss = true

      throw err
    }
  }

  const exportUsers = async () => {
    try {
      loading.export = true
      error.export = false

      const file = await apis.user.export()
      downloadFile(file, 'users.xlsx')

      loading.export = false
      error.export = false
    } catch (err) {
      loading.export = false
      error.export = true

      throw err
    }
  }

  const getUserStatistics = async () => {
    try {
      loading.statistics = true
      error.statistics = false

      const data = await apis.user.statistics()

      loading.statistics = false
      error.statistics = false

      return {
        totalUsers: data.users_total,
        usersByDepartment: data.users_by_department
      }
    } catch (err) {
      loading.statistics = false
      error.statistics = true

      throw err
    }
  }

  return {
    loading,
    error,
    getUserCollection,
    getUserById,
    updateUser,
    createUser,
    dismissUser,
    exportUsers,
    getUserStatistics
  }
}

export default useUser
