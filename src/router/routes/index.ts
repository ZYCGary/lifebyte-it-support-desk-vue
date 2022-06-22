const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard.view.vue')
  },
  {
    path: '/users',
    name: 'user-list',
    component: () => import('@/views/users/user-list.view.vue')
  },
  {
    path: '/software',
    name: 'software-list',
    component: () => import('@/views/software/software-list.view.vue')
  },
  {
    path: '/hardware',
    name: 'hardware-list',
    component: () => import('@/views/hardware/hardware-list.view.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error-not-found',
    component: () => import('@/views/error.view.vue')
  }
]

export default routes
