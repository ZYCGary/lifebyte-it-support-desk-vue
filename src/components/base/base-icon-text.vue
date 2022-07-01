<template>
  <div class="flex flex-row flex-nowrap items-center">
    <el-icon><i :class="iconClass"></i></el-icon>
    <span class="ml-2">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-icon-text',
  props: {
    iconClass: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
