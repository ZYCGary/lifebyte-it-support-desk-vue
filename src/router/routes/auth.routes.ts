export default {
  path: '/login',
  name: 'auth.login',
  component: () => import('@/views/auth/log-in.view.vue'),
  meta: { adminOnly: false }
}
