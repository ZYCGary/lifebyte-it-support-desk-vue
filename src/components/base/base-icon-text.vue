<template>
  <i :class="iconClass"></i>
  <span class="ml-2">{{ text }}</span>
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
