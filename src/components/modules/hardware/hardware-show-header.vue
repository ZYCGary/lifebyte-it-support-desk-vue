<template>
  <div class="flex flex-row flex-nowrap items-center">
    <h1>Hardware Detail</h1>
    <div class="flex flex-1 justify-end">
      <base-button
        icon-class="fa-solid fa-rotate-left"
        type="warning"
      >
        Return
      </base-button>
      <base-button
        icon-class="fa-solid fa-right-from-bracket"
        type="danger"
      >
        Delete
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseButton from '@/components/base/base-button.vue'
import { Hardware } from '@/types/store/hardware.module.type'

export default defineComponent({
  name: 'hardware-show-header',
  components: { BaseButton },
  props: {
    hardware: {
      required: true,
      type: Object as PropType<Hardware>
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
