// Define injection key.
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { RootState } from '@/types/store/root.module.type'
import appModule from '@/store/modules/app.module'
import rootMutations from '@/store/root.mutations'
import rootActions from '@/store/root.actions'

export const key: InjectionKey<Store<RootState>> = Symbol('injection key')

export const store = createStore({
  modules: { app: appModule },
  mutations: rootMutations,
  actions: rootActions,
  strict: import.meta.env.DEV
})

export function useStore() {
  return baseUseStore(key)
}
