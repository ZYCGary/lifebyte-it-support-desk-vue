<template>
  <el-drawer
    v-model="drawer.show"
    @closed="closeDrawer"
    destroy-on-close
  >
    {{ user }}
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watchEffect } from 'vue'
import { User } from '@/types/store/user.module.type'

export default defineComponent({
  name: 'user-drawer',
  props: {
    show: {
      required: true,
      type: Boolean,
      default: false
    },
    user: {
      required: true,
      type: Object as PropType<User>
    }
  },
  emits: ['update:show', 'update:user'],
  setup: (props, { emit }) => {
    const drawer = reactive({
      show: props.show,
      user: props.user
    })

    watchEffect(() => {
      drawer.show = props.show
      drawer.user = props.user
    })

    const closeDrawer = () => {
      console.log('close')
      emit('update:show', false)
      emit('update:user', {})
    }

    return { drawer, closeDrawer }
  }
})
</script>

<style scoped></style>
