import apis from '@/http/apis'
import { ref } from 'vue'
import { Location } from '@/types/store/location.module.type'

const useLocations = () => {
  const loading = ref<boolean>(true)

  const error = ref<boolean>(false)

  const getAllLocations = async (): Promise<Location[]> => {
    try {
      const locations = await apis.location.getAllLocations()
      loading.value = false
      error.value = false

      return locations
    } catch (err) {
      loading.value = false
      error.value = true

      return []
    }
  }

  return { loading, error, getAllLocations }
}

export default useLocations
