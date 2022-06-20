import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { AppState } from '@/types/store/app.module.type'

export interface RootState {
  app: AppState
}

export interface RootGetterTree extends GetterTree<RootState, RootState> {}

export interface RootMutationTree extends MutationTree<RootState> {}

export interface RootActionTree extends ActionTree<RootState, RootState> {}
