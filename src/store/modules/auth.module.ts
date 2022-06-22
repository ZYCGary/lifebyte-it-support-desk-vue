import { AuthActionTree, AuthGetterTree, AuthMutationTree, AuthState } from '@/types/store/auth.module.type'
import { Module } from 'vuex'
import { RootState } from '@/types/store/root.module.type'
import apis from '@/http/apis'
import { User } from '@/types/store/user.module.type'

const state: AuthState = {
  user: null,
  authenticated: false
}

const getters: AuthGetterTree = {
  isAdmin: () => {
    return !!(state.authenticated && state.user && state.user?.is_admin)
  }
}

const mutations: AuthMutationTree = {
  setUser: (authState, payload) => {
    authState.user = payload
  },

  setAuthenticated: (authState, payload) => {
    authState.authenticated = payload
  }
}

const actions: AuthActionTree = {
  login: async ({ dispatch }, payload) => {
    try {
      await apis.app.getCsrfToken()
      await apis.auth.login(payload)
      await dispatch('getCurrentUser')
    } catch (error) {
      throw error
    }
  },

  getCurrentUser: async ({ commit }) => {
    try {
      const user = (await apis.auth.getCurrentUser()) as User
      commit('setUser', user)
      commit('setAuthenticated', true)
    } catch (error) {
      throw error
    }
  }
}

const module: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
