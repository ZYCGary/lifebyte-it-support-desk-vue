<template>
  <the-app active-menu="software">
    <template #heading>
      <h1>Software</h1>
    </template>
    <template #content>
      <el-container>
        <el-main>
          <h1>Software List</h1>
        </el-main>
        <the-right-aside>
          <h1>Filter</h1>
        </the-right-aside>
      </el-container>
    </template>
  </the-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheApp from '@/components/base/the-app.vue'
import TheRightAside from '@/components/base/the-right-aside.vue'

export default defineComponent({
  name: 'DashboardView',
  components: { TheRightAside, TheApp },
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
