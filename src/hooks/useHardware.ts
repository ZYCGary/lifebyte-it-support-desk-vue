import { reactive } from 'vue'
import { Hardware, HardwareFilter } from '@/types/store/hardware.module.type'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'
import { User } from '@/types/store/user.module.type'
import downloadFile from '@/utils/download-file'

const useHardware = () => {
  const loading = reactive({
    collection: false,
    show: false,
    update: false,
    store: false,
    export: false,
    destroy: false
  })

  const error = reactive({
    collection: false,
    show: false,
    update: false,
    store: false,
    export: false,
    destroy: false
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

  const createHardware = async (payload: object): Promise<void> => {
    try {
      loading.store = true
      error.store = false

      await apis.hardware.store(payload)

      loading.store = false
      error.store = false
    } catch (err) {
      loading.store = false
      error.store = true

      throw err
    }
  }

  const returnHardware = async (hardwareId: number, returnTo: User): Promise<void> => {
    try {
      loading.update = true
      error.update = false

      await apis.hardware.update(hardwareId, { user: returnTo })

      loading.update = false
      error.update = false
    } catch (err) {
      loading.update = false
      error.update = true

      throw err
    }
  }

  const exportHardware = async () => {
    try {
      loading.export = true
      error.export = false

      const file = await apis.hardware.export()
      downloadFile(file, 'hardware.xlsx')

      loading.export = false
      error.export = false
    } catch (err) {
      loading.export = false
      error.export = true

      throw err
    }
  }

  const deleteHardware = async (hardwareId: number) => {
    try {
      loading.destroy = true
      error.destroy = false

      await apis.hardware.destroy(hardwareId)

      loading.destroy = false
      error.destroy = false
    } catch (err) {
      loading.destroy = false
      error.destroy = true

      throw err
    }
  }

  return {
    loading,
    error,
    getHardwareCollection,
    getHardwareById,
    updateHardware,
    createHardware,
    returnHardware,
    exportHardware,
    deleteHardware
  }
}

export default useHardware
