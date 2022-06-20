import { AppActionTree, AppGetterTree, AppMutationTree, AppState } from '@/types/store/app.module.type'
import { Module } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

const state: AppState = {
  env: undefined,
  active_menu: 'dashboard'
}

const getters: AppGetterTree = {}

const mutations: AppMutationTree = {
  setEnv: (appState, env) => {
    appState.env = env
  },

  setActiveMenu: (appState, menuName) => {
    appState.active_menu = menuName
  }
}

const actions: AppActionTree = {}

const module: Module<AppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
