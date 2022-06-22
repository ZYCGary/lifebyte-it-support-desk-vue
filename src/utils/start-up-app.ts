import { store } from '@/store'

const startUpApp = async () => {
  try {
    await store.dispatch('fetchPublicConfigs')
    await store.dispatch('auth/getCurrentUser')

    const { env } = store.state.app

    if (env !== undefined) {
      return 'success'
    }

    return 'failure'
  } catch (error) {
    return 'failure'
  }
}

export default startUpApp
