<template>
  <div>
    <el-drawer
      v-model="drawer.show"
      @closed="closeDrawer"
      destroy-on-close
      :size="800"
    >
      <template #header>
        <h1 class="font-bold text-2xl text-black">{{ user.name }}</h1>
      </template>

      <div>
        <el-descriptions
          border
          :title="user.email"
          :column="2"
        >
          <el-descriptions-item label="Department">{{ user.department }}</el-descriptions-item>
          <el-descriptions-item label="Job Title">{{ user.job_title }}</el-descriptions-item>
          <el-descriptions-item label="Office">{{ user.location_office }}</el-descriptions-item>
          <el-descriptions-item label="Position">{{ user.location_position }}</el-descriptions-item>
          <el-descriptions-item label="State">{{ user.state === 1 ? 'On Job' : 'Left' }}</el-descriptions-item>
          <el-descriptions-item label="Is Admin">{{ user.is_admin ? 'True' : 'False' }}</el-descriptions-item>
        </el-descriptions>

        <div class="flex flex-row flex-nowrap justify-end mt-4">
          <el-button type="success"><i class="fa-solid fa-pen-to-square"></i></el-button>
          <el-button type="danger"><i class="fa-solid fa-trash-can"></i></el-button>
        </div>
      </div>

      <el-divider></el-divider>
    </el-drawer>
  </div>
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
