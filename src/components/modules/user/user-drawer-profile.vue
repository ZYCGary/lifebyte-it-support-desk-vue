<template>
  <div v-if="!editable">
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
      <el-button
        type="success"
        @click="$emit('update:editable', true)"
      >
        <i class="fa-solid fa-pen-to-square"></i>
        <span class="ml-2">Edit</span>
      </el-button>
      <el-button type="danger">
        <i class="fa-solid fa-trash-can"></i>
        <span class="ml-2">Dismiss</span>
      </el-button>
    </div>
  </div>

  <div v-else>
    <user-drawer-profile-form
      :user="user"
      @close="$emit('update:editable', false)"
    ></user-drawer-profile-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '@/types/store/user.module.type'
import UserDrawerProfileForm from '@/components/modules/user/user-drawer-profile-form.vue'

export default defineComponent({
  name: 'user-drawer-profile',
  components: { UserDrawerProfileForm },
  props: {
    editable: {
      required: true,
      type: Boolean
    },
    user: {
      required: true,
      type: Object as PropType<User>
    }
  },
  emits: ['update:editable'],
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
