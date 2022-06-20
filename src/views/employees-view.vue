<template>
  <the-app active-menu="employees">
    <template #main>
      <h1>Employees</h1>
    </template>
  </the-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheApp from '@/components/base/the-app.vue'

export default defineComponent({
  name: 'DashboardView',
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
