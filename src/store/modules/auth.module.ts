import { AuthActionTree, AuthGetterTree, AuthMutationTree, AuthState } from '@/types/store/auth.module.type'
import { Module } from 'vuex'
import { RootState } from '@/types/store/root.module.type'
import apis from '@/http/apis'
import { User } from '@/types/store/user.module.type'

const state: AuthState = {
  user: null,
  authenticated: false
}

const getters: AuthGetterTree = {}

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
      await dispatch('getAuthenticatedUser')
    } catch (error) {
      throw error
    }
  },

  getAuthenticatedUser: async ({ commit }) => {
    try {
      const user = (await apis.auth.getAuthenticatedUser()) as User
      commit('setUser', user)
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
