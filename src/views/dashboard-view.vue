<template>
  <el-main>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="Users"
        name="users"
        lazy
      >
        <user-dashboard></user-dashboard>
      </el-tab-pane>
      <el-tab-pane
        label="Hardware"
        name="hardware"
        lazy
      >
        <hardware-dashboard></hardware-dashboard>
      </el-tab-pane>
      <el-tab-pane
        label="Software"
        name="software"
        lazy
        >Software</el-tab-pane
      >
    </el-tabs>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserDashboard from '@/components/modules/user/user-dashboard.vue'
import HardwareDashboard from '@/components/modules/hardware/hardware-dashboard.vue'

export default defineComponent({
  name: 'dashboard-view',
  components: { HardwareDashboard, UserDashboard },
  props: {},
  setup() {
    const activeTab = ref<string>('hardware')

    return { activeTab }
  }
})
</script>

<style scoped>
.el-container,
.el-menu {
  height: 100%;
}
</style>
