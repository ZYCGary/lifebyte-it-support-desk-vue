<template>
  <el-table
    :data="data"
    border
    flexible
    fit
    lazy
    class="overflow-auto w-auto max-h-full"
  >
    <el-table-column
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      property="name"
      label="Name"
      width="250"
      fixed
    ></el-table-column>
    <el-table-column
      property="email"
      label="Email"
      width="300"
    ></el-table-column>
    <el-table-column
      property="department"
      label="Department"
      min-width="200"
    ></el-table-column>
    <el-table-column
      property="job_title"
      label="Job Title"
      min-width="250"
    ></el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="140"
    >
      <template #default="scope">
        <div class="flex flex-row flex-nowrap gap-x-2">
          <router-link :to="{ name: 'user.show', params: { id: scope.row.id } }">
            <el-tooltip
              content="Profile"
              placement="top"
              :show-after="500"
            >
              <base-button
                icon-class="fa-solid fa-user"
                :text="false"
              >
              </base-button>
            </el-tooltip>
          </router-link>

          <el-tooltip
            content="Edit"
            placement="top"
            :show-after="500"
          >
            <base-button
              icon-class="fa-solid fa-pen-to-square"
              type="primary"
              :text="false"
              @click="showUpdateDialog(scope.row.id)"
            >
            </base-button>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>

    <template #empty>
      {{ loading ? 'Loading data...' : error ? 'Failed to load data' : 'No data' }}
    </template>
  </el-table>

  <!-- User profile update dialog -->
  <el-dialog
    v-model="updateUserDialogVisible"
    title="Update User"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <user-profile-update-form
      :user-id="clickedUserId"
      @cancel="updateUserDialogVisible = false"
      @updated="handleUserUpdated"
    ></user-profile-update-form>
  </el-dialog>
  <!-- User profile update dialog end -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import BaseButton from '@/components/base/base-button.vue'
import { User } from '@/types/store/user.module.type'
import UserProfileUpdateForm from '@/components/modules/user/user-profile-update-form.vue'

export default defineComponent({
  name: 'user-table',
  components: { UserProfileUpdateForm, BaseButton },
  props: {
    data: {
      required: true,
      type: Array as PropType<User[]>
    },
    loading: {
      required: true,
      type: Boolean
    },
    error: {
      required: true,
      type: Boolean
    }
  },
  emits: ['userUpdated'],
  setup: (props, { emit }) => {
    const updateUserDialogVisible = ref<boolean>(false)
    const clickedUserId = ref<number>(0)

    const showUpdateDialog = (userId: number) => {
      clickedUserId.value = userId
      updateUserDialogVisible.value = true
    }

    const handleUserUpdated = () => {
      updateUserDialogVisible.value = false
      emit('userUpdated')
    }

    return { updateUserDialogVisible, clickedUserId, showUpdateDialog, handleUserUpdated }
  }
})
</script>

<style scoped></style>
