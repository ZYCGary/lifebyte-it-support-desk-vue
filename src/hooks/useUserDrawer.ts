import { useStore } from '@/store'
import { computed } from 'vue'
import { User } from '@/types/store/user.module.type'
import { ModuleDrawerType } from '@/types/enums/components.enum'

const useUserDrawer = () => {
  const store = useStore()

  const drawer = computed(() => store.state.user.drawer)

  const openDrawer = (type: ModuleDrawerType, data?: User | {}) => {
    if (data) store.commit('user/setDrawerUser', data)
    store.commit('user/setDrawerType', type)
    store.commit('user/openDrawer')
  }

  const closeDrawer = () => store.commit('user/closeDrawer')

  return { drawer, openDrawer, closeDrawer }
}

export default useUserDrawer
