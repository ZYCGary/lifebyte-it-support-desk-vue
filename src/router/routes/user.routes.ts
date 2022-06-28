import TheApp from '@/components/layouts/the-app.vue'

export default {
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
}
