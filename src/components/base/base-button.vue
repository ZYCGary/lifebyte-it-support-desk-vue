<template>
  <el-button>
    <template
      #icon
      v-if="iconClass"
    >
      <el-icon><i :class="iconClass"></i></el-icon>
    </template>
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-button',
  props: {
    iconClass: {
      required: false,
      type: String
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
