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
    return !!(state.user && state.user?.permission_level > 0 && state.user.state !== 0)
  },
  isSuperAdmin: () => {
    return !!(state.user && state.user?.permission_level > 1 && state.user.state !== 0)
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

      if (getters.isAdmin()) {
        commit('setAuthenticated', true)
      }
    } catch (error) {
      throw error
    }
  },

  logout: async ({ commit }) => {
    try {
      await apis.auth.logout()
      commit('setUser', null)
      commit('setAuthenticated', false)
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
