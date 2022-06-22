import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { AppState } from '@/types/store/app.module.type'
import { AuthState } from '@/types/store/auth.module.type'

export interface RootState {
  app: AppState
  auth: AuthState
}

export interface RootGetterTree extends GetterTree<RootState, RootState> {}

export interface RootMutationTree extends MutationTree<RootState> {}

export interface RootActionTree extends ActionTree<RootState, RootState> {
  fetchPublicConfigs: ({ commit }: ActionContext<RootState, RootState>) => Promise<void>
}
