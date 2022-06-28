<template>
  <el-container>
    <el-main>
      <h1>Software List</h1>
    </el-main>
    <the-right-aside>
      <h1>Filter</h1>
    </the-right-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'

export default defineComponent({
  components: { TheRightAside },
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
