<template>
  <el-button v-if="text">
    <template
      #icon
      v-if="iconClass"
    >
      <el-icon><i :class="iconClass"></i></el-icon>
    </template>
    <slot></slot>
  </el-button>
  <el-button v-else>
    <template
      #icon
      v-if="iconClass"
    >
      <el-icon><i :class="iconClass"></i></el-icon>
    </template>
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
    },
    text: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
