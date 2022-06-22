const routes = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/auth/log-in.view.vue'),
    meta: { adminOnly: false }
  },

  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard.view.vue'),
    meta: { adminOnly: true }
  },

  {
    path: '/users',
    name: 'user-list',
    component: () => import('@/views/users/user-list.view.vue'),
    meta: { adminOnly: true }
  },

  {
    path: '/software',
    name: 'software-list',
    component: () => import('@/views/software/software-list.view.vue'),
    meta: { adminOnly: true }
  },

  {
    path: '/hardware',
    name: 'hardware-list',
    component: () => import('@/views/hardware/hardware-list.view.vue'),
    meta: { adminOnly: true }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'error-not-found',
    component: () => import('@/views/error.view.vue'),
    meta: { adminOnly: false }
  }
]

export default routes
