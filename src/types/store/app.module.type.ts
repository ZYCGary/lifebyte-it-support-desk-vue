import { Environment } from '@/types/enums/app.enum'
import { RootState } from '@/types/store/root.module.type'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface AppState {
  env: Environment | undefined
  active_menu: string
}

export interface AppGetterTree extends GetterTree<AppState, RootState> {}

export interface AppMutationTree extends MutationTree<AppState> {
  setEnv: (appState: AppState, env: Environment) => void
  setActiveMenu: (appState: AppState, menuName: string) => void
}

export interface AppActionTree extends ActionTree<AppState, RootState> {}
