import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import authenticateGuard from '@/router/guards/authenticate.guard'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  await authenticateGuard(to, from, next)
})

export default router
