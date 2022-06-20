import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { key, store } from '@/store'
import startUpApp from '@/utils/start-up-app'

const app = createApp(App)

if ((await startUpApp()) === 'success') {
  app.use(router)
  app.use(store, key)

  app.mount('#app')
} else {
  console.error('[TMGM] Failed to start App!')
}
