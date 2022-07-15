import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store/root.module.type'
import { Hardware } from '@/types/store/hardware.module.type'

export interface User {
  id: number
  name: string
  email: string
  company: string
  department: string
  job_title: string
  location: {
    id: number
    name: string
    country: string
  }
  hardware?: Hardware[]
  desk: string
  state: number
  type: string
  permission_level: number
  created_at?: string
  updated_at?: string
}

export interface UserFilter {
  page?: number | string
  name?: string
  email?: string
  department?: string
  job_title?: string
  company?: string
  type?: string
  location_id?: number | string
  desk?: string
  state?: number | string
  permission_level?: number | string
  paginate?: boolean
}

export interface UserState {}

export interface UserGetterTree extends GetterTree<UserState, RootState> {}

export interface UserMutationTree extends MutationTree<UserState> {}

export interface UserActionTree extends ActionTree<UserState, RootState> {}
