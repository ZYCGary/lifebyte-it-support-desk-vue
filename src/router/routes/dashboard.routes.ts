import TheApp from '@/components/layouts/the-app.vue'

export default {
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
}
