<template>
  <the-app active-menu="hardware">
    <template #heading>
      <h1>Hardware</h1>
    </template>

    <template #content>
      <el-container>
        <el-main>
          <h1>Hardware List</h1>
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
import TheApp from '@/components/layouts/the-app.vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'

export default defineComponent({
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
