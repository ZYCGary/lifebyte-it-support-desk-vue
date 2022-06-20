import { AppConfigs } from '@/types/configs/app.configs.type'
import { Environment } from '@/types/enums/app.enum'

/** Types of static configs parsed from 'public/configs.json' */
export interface PublicConfigs {
  APP_ENV: Environment
  API_URL: string
}

/** Types of configs of different running mode. */
export interface RootConfigs {
  app: AppConfigs
}
