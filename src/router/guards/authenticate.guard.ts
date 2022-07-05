import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { store } from '@/store'

const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (store.getters['auth/isAdmin']) {
    if (to.matched.some((route) => !route.meta.adminOnly)) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    if (to.matched.some((route) => route.meta.adminOnly)) next({ name: 'auth.login' })
    else next()
  }
}

export default guard
