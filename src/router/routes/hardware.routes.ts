import TheApp from '@/components/layouts/the-app.vue'

export default {
  path: '/hardware',
  component: TheApp,
  meta: { adminOnly: true },
  children: [
    {
      path: '',
      name: 'hardware.index',
      component: () => import('@/views/hardware/hardware-index-view.vue'),
      meta: { adminOnly: true }
    }
  ]
}
