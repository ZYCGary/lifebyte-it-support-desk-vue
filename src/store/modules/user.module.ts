import { UserActionTree, UserGetterTree, UserMutationTree, UserState } from '@/types/store/user.module.type'
import { Module } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

const state: UserState = {}

const getters: UserGetterTree = {}

const mutations: UserMutationTree = {}

const actions: UserActionTree = {}

const module: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
