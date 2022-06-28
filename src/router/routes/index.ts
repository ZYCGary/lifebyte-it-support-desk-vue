import userRoutes from '@/router/routes/user.routes'
import hardwareRoutes from '@/router/routes/hardware.routes'
import softwareRoutes from '@/router/routes/software.routes'
import dashboardRoutes from '@/router/routes/dashboard.routes'
import authRoutes from '@/router/routes/auth.routes'

const routes = [
  authRoutes,
  dashboardRoutes,
  userRoutes,
  hardwareRoutes,
  softwareRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'error-not-found',
    component: () => import('@/views/error.view.vue'),
    meta: { adminOnly: false }
  }
]

export default routes
