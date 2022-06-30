import requests from '@/http/requests'
import { HardwareFilter } from '@/types/store/hardware.module.type'

const hardwareApis = {
  getHardwareCollection: async (filter?: HardwareFilter) => {
    // Remove empty filter keys.
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (typeof value !== 'number' && !Object.keys(value).length) delete filter[key as keyof HardwareFilter]
      }
    }

    const response = await requests.get('api/v1/hardware', filter)

    return response.data
  }
}

export default hardwareApis
