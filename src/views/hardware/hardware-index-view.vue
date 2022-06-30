<template>
  <the-content-header>
    <hardware-list-header></hardware-list-header>
  </the-content-header>
  <el-container class="relative">
    <el-container class="h-full overflow-y-auto">
      <el-main>
        <div class="relative flex flex-row flex-wrap">table</div>
      </el-main>
    </el-container>
    <the-right-aside>
      <h1>Filter</h1>
    </the-right-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'
import HardwareListHeader from '@/components/modules/hardware/hardware-list-header.vue'

export default defineComponent({
  components: { HardwareListHeader, TheContentHeader, TheRightAside },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
