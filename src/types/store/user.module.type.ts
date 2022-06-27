import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store/root.module.type'
import { ModuleDrawerType } from '@/types/enums/components.enum'

export interface User {
  id: number
  name: string
  email: string
  department: string | null
  job_title: string | null
  location_office: string
  location_position: string
  state: number
  is_admin: boolean
}

export interface UserState {
  drawer: {
    user: User | null
    open: boolean
    type: ModuleDrawerType
  }
}

export interface UserGetterTree extends GetterTree<UserState, RootState> {}

export interface UserMutationTree extends MutationTree<UserState> {
  setDrawerUser: (userState: UserState, user: User | null) => void
  openDrawer: () => void
  closeDrawer: () => void
  setDrawerType: (userState: UserState, type: ModuleDrawerType) => void
}

export interface UserActionTree extends ActionTree<UserState, RootState> {}
