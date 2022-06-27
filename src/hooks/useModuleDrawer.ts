import { useStore } from '@/store'
import { computed } from 'vue'
import { User } from '@/types/store/user.module.type'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import { Module } from '@/types/enums/app.enum'

const getDrawer = (module: Module) => {
  const store = useStore()

  switch (module) {
    case 'user':
      return computed(() => store.state.user.drawer)

    default:
      return computed(() => store.state.user.drawer)
  }
}

const useModuleDrawer = (module: Module) => {
  const store = useStore()

  const drawer = getDrawer(module)

  const openDrawer = (type: ModuleDrawerType, data?: User | {}) => {
    switch (module) {
      case 'user':
        if (data) store.commit('user/setDrawerUser', data)
        store.commit('user/setDrawerType', type)
        store.commit('user/openDrawer')
        break

      default:
        break
    }
  }

  const closeDrawer = () => {
    switch (module) {
      case 'user':
        store.commit('user/closeDrawer')
        break

      default:
        break
    }
  }

  return { drawer, openDrawer, closeDrawer }
}

export default useModuleDrawer
