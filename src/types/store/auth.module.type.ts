import { User } from '@/types/store/user.module.type'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/store/root.module.type'

export interface AuthState {
  user: User | null
  authenticated: boolean
}

export interface AuthGetterTree extends GetterTree<AuthState, RootState> {
  isAdmin: () => boolean
}

export interface AuthMutationTree extends MutationTree<AuthState> {
  setUser: (authState: AuthState, payload: User) => void
  setAuthenticated: (authState: AuthState, payload: boolean) => void
}

export interface AuthActionTree extends ActionTree<AuthState, RootState> {
  login: ({ dispatch }: ActionContext<AuthState, RootState>, payload: { email: string; password: string }) => void
  getCurrentUser: ({ commit }: ActionContext<AuthState, RootState>) => void
}
