<template>
  <the-main-content footer>
    <template #header>
      <h1>Edit User</h1>
    </template>

    <template #content>
      <el-main>
        <!-- Skeleton -->
        <template v-if="loadingLocation.all || loadingUser.show">
          <el-skeleton
            :count="8"
            class="grid grid-cols-2 gap-4"
          >
            <template #template>
              <div>
                <el-skeleton-item
                  variant="h1"
                  class="w-40"
                ></el-skeleton-item>
                <el-skeleton-item
                  variant="button"
                  class="w-full"
                ></el-skeleton-item>
              </div>
            </template>
          </el-skeleton>
        </template>
        <!-- Skeleton end -->

        <template v-else>
          <template v-if="locationError.all || userError.show">
            <div class="text-center">User not found</div>
          </template>

          <!-- User form.data form -->
          <template v-else>
            <el-form
              ref="formRef"
              :model="form.data"
              :rules="form.rules"
              label-position="top"
              status-icon
              class="grid grid-cols-2 gap-x-4"
            >
              <el-form-item
                label="Name"
                prop="name"
              >
                <el-input v-model="form.data.name" />
              </el-form-item>
              <el-form-item
                label="Email"
                prop="email"
              >
                <el-input v-model="form.data.email" />
              </el-form-item>
              <el-form-item
                label="Department"
                prop="department"
              >
                <el-input v-model="form.data.department" />
              </el-form-item>
              <el-form-item
                label="Job Title"
                prop="job_title"
              >
                <el-input v-model="form.data.job_title" />
              </el-form-item>
              <el-form-item
                label="Desk"
                prop="desk"
              >
                <el-input v-model="form.data.desk" />
              </el-form-item>
              <el-form-item
                label="Company"
                prop="company"
              >
                <el-select
                  v-model="form.data.company"
                  placeholder="Select/Input a company"
                  class="w-full"
                  filterable
                  allow-create
                  default-first-option
                >
                  <el-option
                    v-for="item in form.companyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="Location"
                prop="location"
              >
                <el-select
                  v-model="form.data.location_id"
                  value-key="id"
                  placeholder="Select a location"
                  class="w-full"
                >
                  <el-option
                    v-for="item in form.locationOptions"
                    :key="item.id"
                    :label="`${item.name} - ${item.country}`"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="Type"
                prop="type"
              >
                <el-select
                  v-model="form.data.type"
                  placeholder="Select a type"
                  class="w-full"
                >
                  <el-option
                    v-for="item in form.typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="State"
                prop="state"
              >
                <el-select
                  v-model="form.data.state"
                  placeholder="Select a state"
                  class="w-full"
                >
                  <el-option
                    v-for="item in form.stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="isSuperAdmin"
                label="Permission Level"
                prop="permission_level"
              >
                <el-select
                  v-model="form.data.permission_level"
                  placeholder="Select a company permission level"
                  class="w-full"
                >
                  <el-option
                    v-for="item in form.permissionLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
          <!-- User form.data form end -->
        </template>
      </el-main>
    </template>

    <template #footer>
      <div
        v-if="!loadingLocation.all && !loadingUser.show && !locationError.all && !userError.show"
        class="col-span-2 flex flex-row flex-nowrap justify-end"
      >
        <base-button
          icon-class="fa-solid fa-check"
          type="success"
          :loading="loadingUser.update"
          @click="handleUpdate"
        >
          Update
        </base-button>
        <base-button
          icon-class="fa-solid fa-ban"
          type="info"
          :disabled="loadingUser.update"
          @click="handleCancel"
        >
          Cancel
        </base-button>
      </div>
    </template>
  </the-main-content>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import useLocation from '@/hooks/useLocation'
import { Location } from '@/types/store/location.module.type'
import useUser from '@/hooks/useUser'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import BaseButton from '@/components/base/base-button.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user-edit-view',
  components: { BaseButton, TheMainContent },
  props: {},
  setup: () => {
    const { loading: loadingLocation, error: locationError, getAllLocations } = useLocation()
    const { loading: loadingUser, error: userError, getUserById, updateUser } = useUser()
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const userId = parseInt(route.params.id as string)

    const formRef = ref()

    const form = reactive({
      data: {
        name: '',
        email: '',
        type: '',
        department: '',
        job_title: '',
        desk: '',
        location_id: '' as string | number,
        company: '',
        state: '' as string | number,
        permission_level: '' as string | number
      },
      companyOptions: [
        { label: 'LifeByte', value: 'LifeByte' },
        { label: 'TMGM', value: 'TMGM' }
      ],
      locationOptions: [] as Location[],
      typeOptions: [
        { label: 'Employee', value: 'Employee' },
        { label: 'Storage', value: 'Storage' },
        { label: 'Meeting Room', value: 'Meeting Room' },
        { label: 'Others', value: 'Others' }
      ],
      stateOptions: [
        { label: 'Left', value: 0 },
        { label: 'On Job', value: 1 }
      ],
      permissionLevelOptions: [
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ],
      rules: {
        name: [{ required: true, message: `Please input user's name` }],
        email: [
          { required: true, message: `Please input user's email` },
          { type: 'email', message: `Please input a valid email` }
        ],
        company: [{ required: true, message: `Please select/input user's company` }],
        location_id: [{ required: true, message: `Please select user's location` }],
        type: [{ required: true, message: `Please select user type` }],
        state: [
          { required: true, message: `Please select user's working state` },
          { type: 'number', message: `Please select a valid option` }
        ],
        permission_level: [
          { required: true, message: `Please select user's permission level` },
          { type: 'number', message: `Please select a valid option` }
        ]
      }
    })

    getAllLocations().then((locations) => {
      form.locationOptions = locations
    })

    getUserById(userId)
      .then((user) => {
        form.data.name = user.name
        form.data.email = user.email
        form.data.type = user.type
        form.data.department = user.department
        form.data.job_title = user.job_title
        form.data.desk = user.desk
        form.data.location_id = user.location.id
        form.data.company = user.company
        form.data.state = user.state
        form.data.permission_level = user.permission_level
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'User not found.'
        })
      })

    const isSuperAdmin = computed(() => store.getters['auth/isSuperAdmin'])

    const handleUpdate = () => {
      updateUser(userId, form.data)
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Update user profile successfully.'
          })

          router.push({ name: 'user.show', params: { id: userId } })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to update user profile.'
          })
        })
    }

    const handleCancel = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          router.push({ name: 'user.show', params: { id: route.params.id } })
        })
        .catch()
    }

    return {
      loadingLocation,
      locationError,
      loadingUser,
      userError,
      formRef,
      form,
      isSuperAdmin,
      handleUpdate,
      handleCancel
    }
  }
})
</script>

<style scoped></style>
