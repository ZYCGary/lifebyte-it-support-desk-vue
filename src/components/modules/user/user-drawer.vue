<template>
  <el-drawer
    v-model="drawer.show"
    @closed="closeDrawer"
    destroy-on-close
  >
    <el-descriptions
      :title="user.name"
      :extra="user.email"
      column="2"
    >
      <el-descriptions-item label="Department">{{ user.department }}</el-descriptions-item>
      <el-descriptions-item label="Job Title">{{ user.job_title }}</el-descriptions-item>
      <el-descriptions-item label="Office">{{ user.location_office }}</el-descriptions-item>
      <el-descriptions-item label="Position">{{ user.location_position }}</el-descriptions-item>
    </el-descriptions>
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
