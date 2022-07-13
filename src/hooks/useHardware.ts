import { reactive } from 'vue'
import { Hardware, HardwareFilter } from '@/types/store/hardware.module.type'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'

const useHardware = () => {
  const loading = reactive({
    collection: false
  })

  const error = reactive({
    collection: false
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

  return { loading, error, getHardwareCollection }
}

export default useHardware
