<template>
  <div class="flex flex-row flex-nowrap items-center">
    <h1>User Detail</h1>
    <div class="flex flex-1 justify-end">
      <base-button
        icon-class="fa-solid fa-right-from-bracket"
        type="warning"
      >
        Dismiss
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/base/base-button.vue'

export default defineComponent({
  name: 'user-show-header',
  components: { BaseButton },
  props: {},
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
