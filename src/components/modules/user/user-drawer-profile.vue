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
          @click="handleEditButtonClick"
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
      <user-drawer-profile-form :user="user"></user-drawer-profile-form>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import UserDrawerProfileForm from '@/components/modules/user/user-drawer-profile-form.vue'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user-drawer-profile',
  components: { UserDrawerProfileForm },
  props: {},
  setup: () => {
    const store = useStore()
    const drawer = computed(() => store.state.user.drawer)

    const { user, open, type } = drawer.value
    const handleEditButtonClick = () => {
      store.commit('user/setDrawerType', ModuleDrawerType.EDIT)
    }

    return { user, open, type, handleEditButtonClick }
  }
})
</script>

<style scoped></style>
