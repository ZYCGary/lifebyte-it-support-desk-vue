import requests from '@/http/requests'
import { HardwareFilter } from '@/types/store/hardware.module.type'

const hardwareApis = {
  index: async (filter?: HardwareFilter) => {
    // Remove empty filter keys.
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (typeof value !== 'number' && !Object.keys(value).length) delete filter[key as keyof HardwareFilter]
      }
    }

    const response = await requests.get('/api/v1/hardware', filter)

    return response.data
  },
  show: async (hardwareId: number) => {
    const response = await requests.get(`/api/v1/hardware/${hardwareId}`)

    return response.data
  },
  update: async (id: number, payload: any) => {
    await requests.put(`/api/v1/hardware/${id}`, payload)
  },
  store: async (payload: object) => {
    await requests.post('/api/v1/hardware', payload)
  },
  export: async () => {
    const response = await requests.get('/api/v1/hardware/export', {}, { responseType: 'blob' })

    return response?.data
  },
  destroy: async (hardwareId: number) => {
    await requests.delete(`/api/v1/hardware/${hardwareId}`)
  }
}

export default hardwareApis
