<template>
  <div>Dashboard</div>
  <div>Active menu: {{ activeMenu }}</div>
  <div>Env: {{ env }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'DashboardView',
  props: {},
  setup() {
    const store = useStore()
    const activeMenu = computed(() => store.state.app.active_menu)
    const env = computed(() => store.state.app.env)

    return { activeMenu, env }
  }
})
</script>

<style scoped></style>
