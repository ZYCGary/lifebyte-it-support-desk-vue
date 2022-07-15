import { reactive } from 'vue'
import { Hardware, HardwareFilter } from '@/types/store/hardware.module.type'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'

const useHardware = () => {
  const loading = reactive({
    collection: false,
    show: false,
    update: false
  })

  const error = reactive({
    collection: false,
    show: false,
    update: false
  })

  const getHardwareCollection = async (
    filter?: HardwareFilter
  ): Promise<{
    data: Hardware[]
    pagination: BasePaginationProps
  }> => {
    try {
      loading.collection = true
      error.collection = false

      const list = await apis.hardware.index(filter)

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

  const getHardwareById = async (id: number): Promise<Hardware> => {
    try {
      loading.show = true
      error.show = false

      const response = await apis.hardware.show(id)

      loading.show = false
      error.show = false

      return response?.data as Hardware
    } catch (err) {
      loading.show = false
      error.show = true

      throw err
    }
  }

  const updateHardware = async (id: number, payload: object): Promise<void> => {
    try {
      loading.update = true
      error.update = false

      await apis.hardware.update(id, payload)

      loading.update = false
      error.update = false
    } catch (err) {
      loading.update = false
      error.update = true

      throw err
    }
  }

  return { loading, error, getHardwareCollection, getHardwareById, updateHardware }
}

export default useHardware
