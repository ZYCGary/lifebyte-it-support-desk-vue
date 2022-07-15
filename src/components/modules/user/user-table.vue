<template>
  <el-table
    :data="data"
    border
    flexible
    fit
    lazy
    class="overflow-auto w-auto max-h-full"
    row-class-name="cursor-pointer"
    @row-click="handleRowClick"
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
      property="operations"
      width="140"
    >
      <template #default="scope">
        <div class="flex flex-row flex-nowrap gap-x-2">
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
    :destroy-on-close="true"
    :before-close="closeUpdateDialog"
  >
    <user-profile-form-update
      :user-id="clickedUserId"
      @cancel="closeUpdateDialog"
      @updated="handleUserUpdated"
    ></user-profile-form-update>
  </el-dialog>
  <!-- User profile update dialog end -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import BaseButton from '@/components/base/base-button.vue'
import { User } from '@/types/store/user.module.type'
import UserProfileFormUpdate from '@/components/modules/user/user-profile-form-update.vue'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus/es'

export default defineComponent({
  name: 'user-table',
  components: { UserProfileFormUpdate, BaseButton },
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
    const router = useRouter()

    const handleRowClick = (row: User, column: TableColumnCtx<User>) => {
      if (column.property !== 'operations') {
        router.push({ name: 'user.show', params: { id: row.id } })
      }
    }

    const showUpdateDialog = (userId: number) => {
      clickedUserId.value = userId
      updateUserDialogVisible.value = true
    }

    const closeUpdateDialog = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          updateUserDialogVisible.value = false
        })
        .catch(() => {})
    }

    const handleUserUpdated = () => {
      updateUserDialogVisible.value = false
      emit('userUpdated')
    }

    return {
      handleRowClick,
      updateUserDialogVisible,
      clickedUserId,
      showUpdateDialog,
      closeUpdateDialog,
      handleUserUpdated
    }
  }
})
</script>

<style scoped></style>
