import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

export interface User {
  id: number
  name: string
  email: string
  company: string
  department: string | null
  job_title: string | null
  location: {
    id: number
    name: string
    country: string
  }
  desk: string
  state: number
  type: string
  permission_level: number
  created_at?: string
  updated_at?: string
}

export interface UserFilter {
  page?: number | string
  name?: string | null
  email?: string | null
  department?: string | null
  job_title?: string | null
  company?: string | null
  type?: string | null
  location_id?: number | null
  desk?: string | null
  state?: number | null
  permission_level?: number | null
}

export interface UserState {}

export interface UserGetterTree extends GetterTree<UserState, RootState> {}

export interface UserMutationTree extends MutationTree<UserState> {}

export interface UserActionTree extends ActionTree<UserState, RootState> {}
