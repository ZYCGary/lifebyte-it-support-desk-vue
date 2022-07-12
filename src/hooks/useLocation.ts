import apis from '@/http/apis'
import { reactive } from 'vue'
import { Location } from '@/types/store/location.module.type'

const useLocation = () => {
  const loading = reactive({
    all: false
  })

  const error = reactive({
    all: false
  })

  const getAllLocations = async (): Promise<Location[]> => {
    try {
      const locations = await apis.location.getAllLocations()
      loading.all = false
      error.all = false

      return locations
    } catch (err) {
      loading.all = false
      error.all = true

      throw err
    }
  }

  return { loading, error, getAllLocations }
}

export default useLocation
