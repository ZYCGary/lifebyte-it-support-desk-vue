import { AppConfigs } from '@/types/configs/app.configs.type'

const appConfigs: AppConfigs = {
  /**
   * App name.
   * It helps TMGM back-end API to identify TMGM projects.
   */
  name: import.meta.env.VITE_APP_NAME,

  /** App base URL. */
  baseUrl: import.meta.env.BASE_URL,

  /** Whether the app is running in production. */
  prod: import.meta.env.PROD,

  /** Whether the app is running in development (always the opposite of 'prod'). */
  dev: import.meta.env.DEV
}

export default appConfigs
