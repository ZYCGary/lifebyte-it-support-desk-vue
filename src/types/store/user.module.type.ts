import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

export interface User {
  id: number
  name: string
  email: string
  department: string | null
  job_title: string | null
  location: {
    id: number
    name: string
    company: string
    country: string
  }
  desk: string
  state: number
  type: string
  permission_level: number
  created_at?: string
  updated_at?: string
}

export interface UserState {}

export interface UserGetterTree extends GetterTree<UserState, RootState> {}

export interface UserMutationTree extends MutationTree<UserState> {}

export interface UserActionTree extends ActionTree<UserState, RootState> {}
