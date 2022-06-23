<template>
  <the-app active-menu="dashboard">
    <template #heading>
      <h1>Dashboard</h1>
    </template>
    <template #content>
      <el-main>
        <h1>Dashboard Charts</h1>
      </el-main>
    </template>
  </the-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheApp from '@/components/layouts/the-app.vue'

export default defineComponent({
  name: 'DashboardView',
  // eslint-disable-next-line vue/no-unused-components
  components: { TheApp },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped>
.el-container,
.el-menu {
  height: 100%;
}
</style>
