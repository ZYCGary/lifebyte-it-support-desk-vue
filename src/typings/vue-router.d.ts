export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    isAdmin?: boolean
    adminOnly: boolean
  }
}
