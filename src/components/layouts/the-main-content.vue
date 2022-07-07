<template>
  <section class="relative flex flex-col h-full">
    <template v-if="header">
      <div class="sticky z-10 top-0 grid items-center h-12 border-b px-5 bg-white">
        <slot name="header"></slot>
      </div>
    </template>

    <div class="z-0 flex-1 h-full bg-gray-50 overflow-y-auto">
      <slot name="content"></slot>
    </div>

    <template v-if="footer">
      <div class="z-10 flex-1 grid items-center h-16 border-b px-5 py-3">
        <slot name="footer"></slot>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'the-main-content',
  props: {
    header: {
      required: false,
      type: Boolean,
      default: true
    },
    footer: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
