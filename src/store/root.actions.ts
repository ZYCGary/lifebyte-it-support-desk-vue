/** Root actions. */
import { RootActionTree } from '@/types/store/root.module.type'
import { Environment } from '@/types/enums/app.enum'
import { PublicConfigs } from '@/types/configs/root.configs.type'
import http from '@/http'
import requests from '@/http/requests'

const isValidPublicConfigs: (publicConfig: PublicConfigs) => boolean = (publicConfig) => {
  const { APP_ENV, API_URL } = publicConfig

  return APP_ENV !== undefined && Object.values(Environment).includes(APP_ENV) && API_URL !== undefined
}

const rootActions: RootActionTree = {
  fetchPublicConfigs: async ({ commit }) => {
    try {
      const response = await requests.get('/configs.json')
      const publicConfigs = response.data

      if (isValidPublicConfigs(publicConfigs)) {
        const { APP_ENV, API_URL } = publicConfigs

        // Get URL protocol.
        const urlScheme = window.location.origin.split('://')[0]

        // Check URL protocol so that HTTPS protocol cannot run at LOCAL environment.
        if (urlScheme === 'https' && APP_ENV === Environment.LOCAL) {
          alert('Cannot use HTTPS protocol at "LOCAL" environment! Please confirm environment settings.')

          return
        }

        commit('app/setEnv', APP_ENV)

        // Set request base URL.
        http.defaults.baseURL = API_URL

        return
      } else {
        alert(`Invalid public configurations:\n ${response.data}`)

        return
      }
    } catch (error) {
      console.error(`[TMGM] Failed to fetch public configurations!\n ${error}`)

      throw error
    }
  }
}

export default rootActions
