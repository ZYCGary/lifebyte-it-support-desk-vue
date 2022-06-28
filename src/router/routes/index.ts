import TheApp from '@/components/layouts/the-app.vue'

const routes = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/auth/log-in.view.vue'),
    meta: { adminOnly: false }
  },

  // Dashboard
  {
    path: '/',
    component: TheApp,
    meta: { adminOnly: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard-view.vue'),
        meta: { adminOnly: true }
      }
    ]
  },

  // User routes
  {
    path: '/users',
    component: TheApp,
    meta: { adminOnly: true },
    children: [
      {
        path: '',
        name: 'user-index',
        component: () => import('@/views/users/user-index-view.vue'),
        meta: { adminOnly: true }
      }
    ]
  },

  // Hardware routes
  {
    path: '/hardware',
    component: TheApp,
    meta: { adminOnly: true },
    children: [
      {
        path: '',
        name: 'hardware-index',
        component: () => import('@/views/hardware/hardware-index-view.vue'),
        meta: { adminOnly: true }
      }
    ]
  },

  // Software routes
  {
    path: '/software',
    component: TheApp,
    meta: { adminOnly: true },
    children: [
      {
        path: '',
        name: 'software-index',
        component: () => import('@/views/software/software-index-view.vue'),
        meta: { adminOnly: true }
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'error-not-found',
    component: () => import('@/views/error.view.vue'),
    meta: { adminOnly: false }
  }
]

export default routes
