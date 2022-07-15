export default {
  path: '/login',
  name: 'auth.login',
  component: () => import('@/views/auth/login-view.vue'),
  meta: { adminOnly: false }
}
