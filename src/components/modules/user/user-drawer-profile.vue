<template>
  <template v-if="user">
    <div v-if="type === 'show'">
      <el-descriptions
        border
        :title="user.email"
        :column="2"
      >
        <el-descriptions-item
          label="Department"
          width="25%"
          >{{ user.department }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Job Title"
          width="25%"
          >{{ user.job_title }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Office"
          width="25%"
          >{{ user.location_office }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Position"
          width="25%"
          >{{ user.location_position }}</el-descriptions-item
        >
        <el-descriptions-item
          label="State"
          width="25%"
          >{{ user.state === 1 ? 'On Job' : 'Left' }}</el-descriptions-item
        >
        <el-descriptions-item
          label="Is Admin"
          width="25%"
          >{{ user.is_admin ? 'True' : 'False' }}</el-descriptions-item
        >
      </el-descriptions>

      <div class="flex flex-row flex-nowrap justify-end mt-4">
        <el-button
          type="success"
          @click="handleEditClick"
        >
          <base-icon-text
            text="Edit"
            icon-class="fa-solid fa-pen-to-square"
          ></base-icon-text>
        </el-button>
        <el-button type="danger">
          <base-icon-text
            text="Dismiss"
            icon-class="fa-solid fa-trash-can"
          ></base-icon-text>
        </el-button>
      </div>
    </div>

    <div v-else>
      <user-drawer-profile-form :user="user"></user-drawer-profile-form>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import UserDrawerProfileForm from '@/components/modules/user/user-drawer-profile-form.vue'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import BaseIconText from '@/components/base/base-icon-text.vue'
import useModuleDrawer from '@/hooks/useModuleDrawer'
import { Module } from '@/types/enums/app.enum'

export default defineComponent({
  name: 'user-drawer-profile',
  components: { BaseIconText, UserDrawerProfileForm },
  props: {},
  setup: () => {
    const { drawer, openDrawer } = useModuleDrawer(Module.USER)

    const { user, open, type } = toRefs(drawer.value)

    const handleEditClick = () => {
      openDrawer(ModuleDrawerType.EDIT)
    }

    return { user, open, type, handleEditClick }
  }
})
</script>

<style scoped></style>
