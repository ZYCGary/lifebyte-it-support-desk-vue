<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>User Detail</h1>
        <div class="flex flex-1 justify-end">
          <base-button
            v-if="user?.state"
            icon-class="fa-solid fa-right-from-bracket"
            type="warning"
            @click="dismiss"
            :loading="loading.dismiss"
          >
            Dismiss
          </base-button>
        </div>
      </div>
    </template>

    <template #content>
      <el-container class="h-full">
        <el-main>
          <!-- User profile skeleton -->
          <template v-if="loading.show">
            <el-skeleton
              animated
              style="--el-skeleton-circle-size: 2.25rem"
            >
              <template #template>
                <el-skeleton-item
                  variant="circle"
                  style="width: 36px"
                ></el-skeleton-item>
              </template>
            </el-skeleton>
            <el-skeleton :rows="7"></el-skeleton>
          </template>
          <!-- User profile skeleton end -->

          <template v-else>
            <template v-if="!error.show && user">
              <div class="flex flex-row flex-nowrap items-center mb-8">
                <base-avatar :name="user.name"></base-avatar>
                <h1 class="mx-4 font-bold text-2xl">
                  {{ user.name }}
                  <span class="font-normal text-lg">({{ user.email }})</span>
                </h1>
              </div>

              <el-tabs v-model="activeTab">
                <!-- User profile -->
                <el-tab-pane
                  label="Profile"
                  name="profile"
                >
                  <el-descriptions
                    border
                    :column="2"
                  >
                    <el-descriptions-item label="Type">
                      {{ user.type }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Department">
                      {{ user.department }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Job Title">
                      {{ user.job_title }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Desk">
                      {{ user.desk }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Location">
                      {{ user.location.name }} - {{ user.location.country }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Company">
                      {{ user.company }}
                    </el-descriptions-item>
                    <el-descriptions-item label="State">
                      {{ user.state === 1 ? 'On Job' : 'Left' }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Permission Level">
                      {{ user.permission_level }}
                    </el-descriptions-item>
                  </el-descriptions>

                  <div class="flex flex-row flex-nowrap justify-end mt-4">
                    <base-button
                      icon-class="fa-solid fa-pen-to-square"
                      type="primary"
                      @click="updateUserDialogVisible = true"
                    >
                      Edit
                    </base-button>
                  </div>
                </el-tab-pane>
                <!-- User profile end -->

                <el-tab-pane
                  :label="`Hardware (${user.hardware.length})`"
                  name="hardware"
                >
                  <hardware-table
                    :data="user.hardware"
                    :error="error.show"
                    :loading="loading.show"
                    :show-optional-columns="false"
                    @hardware-updated="handleHardwareUpdated"
                    @hardware-returned="handleHardwareReturned"
                  ></hardware-table>
                </el-tab-pane>
              </el-tabs>
            </template>

            <template v-else>
              <div class="text-center">User not found</div>
            </template>
          </template>
        </el-main>
      </el-container>
    </template>
  </the-main-content>

  <!-- User profile update dialog -->
  <el-dialog
    v-model="updateUserDialogVisible"
    title="Update User"
    :destroy-on-close="true"
    :before-close="closeUpdateDialog"
  >
    <user-profile-form-update
      :user-id="userId"
      @cancel="closeUpdateDialog"
      @updated="handleUserUpdated"
    ></user-profile-form-update>
  </el-dialog>
  <!-- User profile update dialog end -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import BaseAvatar from '@/components/base/base-avatar.vue'
import BaseButton from '@/components/base/base-button.vue'
import useUser from '@/hooks/useUser'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import { User } from '@/types/store/user.module.type'
import UserProfileFormUpdate from '@/components/modules/user/user-profile-form-update.vue'
import HardwareTable from '@/components/modules/hardware/hardware-table.vue'

export default defineComponent({
  components: { HardwareTable, UserProfileFormUpdate, BaseButton, BaseAvatar, TheMainContent },
  name: 'user-show-view',
  props: {},
  setup() {
    const route = useRoute()
    const userId = parseInt(route.params.id as string)

    const user = ref<null | User>(null)
    const { loading, error, getUserById, dismissUser } = useUser()
    const loadUser = () => {
      getUserById(userId)
        .then((res) => {
          user.value = res
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to get user details.'
          })
        })
    }

    const activeTab = ref<string>('profile')

    const updateUserDialogVisible = ref<boolean>(false)

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
      loadUser()
    }

    const handleHardwareUpdated = () => {
      loadUser()
    }

    const handleHardwareReturned = () => {
      loadUser()
    }

    const dismiss = () => {
      ElMessageBox.confirm('Are you sure you want to dismiss this user?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          if (user.value && user.value.hardware && user.value.hardware.length === 0) {
            dismissUser(userId)
              .then(() => {
                ElMessage({
                  type: 'success',
                  message: 'Dismissed user successfully.'
                })

                loadUser()
              })
              .catch(() => {
                ElMessage({
                  type: 'error',
                  message: 'Failed to dismiss user.'
                })
              })
          } else {
            ElMessage({
              type: 'warning',
              message: "Please return this user's hardware first."
            })
          }
        })
        .catch(() => {})
    }

    loadUser()

    return {
      loading,
      error,
      user,
      userId,
      activeTab,
      updateUserDialogVisible,
      closeUpdateDialog,
      handleUserUpdated,
      dismiss,
      handleHardwareUpdated,
      handleHardwareReturned
    }
  }
})
</script>

<style scoped></style>
