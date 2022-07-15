<template>
  <div class="w-10 h-10 rounded-full bg-green-600/70 leading-10 font-bold text-center text-xl text-white">
    <template v-if="type === 'name'">
      {{ initial }}
    </template>

    <template v-if="type === 'icon'">
      <i :class="iconClass"></i>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'base-avatar',
  props: {
    type: {
      required: false,
      type: String as PropType<'name' | 'icon' | 'image'>,
      default: 'name'
    },
    name: {
      require: false,
      type: String
    },
    icon: {
      required: false,
      type: String
    }
  },
  setup: (props) => {
    const initial = computed(() => {
      return props.name ? props.name[0].toUpperCase() : '?'
    })

    const iconClass = props?.icon ? props?.icon : 'fa-solid fa-d'

    return { initial, iconClass }
  }
})
</script>

<style scoped></style>
