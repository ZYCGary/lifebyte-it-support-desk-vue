<template>
  <div class="grid items-center h-16 border-b px-5 py-3">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'the-content-header',
  props: {},
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
