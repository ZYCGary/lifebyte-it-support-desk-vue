const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard-view.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('@/views/employees-view.vue')
  },
  {
    path: '/software',
    name: 'software',
    component: () => import('@/views/software-view.vue')
  },
  {
    path: '/hardware',
    name: 'hardware',
    component: () => import('@/views/hardware-view.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found-view.vue')
  }
]

export default routes
