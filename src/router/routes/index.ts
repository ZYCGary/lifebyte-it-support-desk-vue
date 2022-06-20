const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.view.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.view.vue')
  }
]

export default routes
