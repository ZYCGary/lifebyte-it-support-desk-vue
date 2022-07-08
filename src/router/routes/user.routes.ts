import TheApp from '@/components/layouts/the-app.vue'

export default {
  path: '/users',
  component: TheApp,
  meta: { adminOnly: true },
  children: [
    {
      path: '',
      name: 'user.index',
      component: () => import('@/views/users/user-index-view.vue'),
      meta: { adminOnly: true }
    },
    {
      path: ':id',
      name: 'user.show',
      component: () => import('@/views/users/user-show-view.vue'),
      meta: { adminOnly: true }
    },
    {
      path: ':id/edit',
      name: 'user.edit',
      component: () => import('@/views/users/user-edit-view.vue'),
      meta: { adminOnly: true }
    }
  ]
}
