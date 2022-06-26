import { UserActionTree, UserGetterTree, UserMutationTree, UserState } from '@/types/store/user.module.type'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import { Module } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

const state: UserState = {
  drawer: {
    user: null,
    open: false,
    type: ModuleDrawerType.SHOW
  }
}

const getters: UserGetterTree = {}

const mutations: UserMutationTree = {
  setDrawerUser: (userState, user) => {
    userState.drawer.user = user
  },
  openDrawer: () => {
    state.drawer.open = true
  },
  closeDrawer: () => {
    state.drawer.open = false
  },
  setDrawerType: (userState, type) => {
    userState.drawer.type = type
  },
  setDrawer: (userState, drawer) => {
    userState.drawer = drawer
  }
}

const actions: UserActionTree = {}

const module: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
