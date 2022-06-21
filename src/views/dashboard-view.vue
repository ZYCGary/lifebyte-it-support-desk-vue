<template>
  <the-app active-menu="dashboard">
    <template #main>
      <el-main>
        <h1>Dashboard</h1>
      </el-main>
    </template>
  </the-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheApp from '@/components/base/the-app.vue'

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
