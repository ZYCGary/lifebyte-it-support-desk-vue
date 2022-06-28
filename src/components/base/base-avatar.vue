<template>
  <div class="w-9 h-9 rounded-full bg-green-600/70 leading-9 font-bold text-center text-xl text-white">
    {{ initial }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'base-avatar',
  props: {
    name: {
      require: true,
      type: String
    }
  },
  setup: (props) => {
    const initial = computed(() => {
      return props.name ? props.name[0].toUpperCase() : '?'
    })

    return { initial }
  }
})
</script>

<style scoped></style>
