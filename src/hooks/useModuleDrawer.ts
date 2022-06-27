import { useStore } from '@/store'
import { computed } from 'vue'
import { User } from '@/types/store/user.module.type'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import { Module } from '@/types/enums/app.enum'

const useModuleDrawer = (module: Module) => {
  const store = useStore()

  switch (module) {
    case Module.USER:
      return {
        drawer: computed(() => store.state.user.drawer),
        openDrawer: (type: ModuleDrawerType, data?: User | {}) => {
          if (data) store.commit('user/setDrawerUser', data)
          store.commit('user/setDrawerType', type)
          store.commit('user/openDrawer')
        },
        closeDrawer: () => store.commit('user/closeDrawer')
      }
  }
}

export default useModuleDrawer
