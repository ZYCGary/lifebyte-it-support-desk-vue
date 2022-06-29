import TheApp from '@/components/layouts/the-app.vue'

export default {
  path: '/software',
  component: TheApp,
  meta: { adminOnly: true },
  children: [
    {
      path: '',
      name: 'software.index',
      component: () => import('@/views/software/software-index-view.vue'),
      meta: { adminOnly: true }
    }
  ]
}
