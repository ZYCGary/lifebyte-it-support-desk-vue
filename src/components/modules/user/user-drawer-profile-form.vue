<template>
  <el-form
    ref="formRef"
    :model="profile"
    :rules="rules"
    label-position="top"
    status-icon
    class="grid grid-cols-2 gap-x-4"
  >
    <el-form-item
      label="Name"
      prop="name"
    >
      <el-input v-model="profile.name" />
    </el-form-item>
    <el-form-item
      label="Email"
      prop="email"
    >
      <el-input v-model="profile.email" />
    </el-form-item>
    <el-form-item
      label="Department"
      prop="department"
    >
      <el-input v-model="profile.department" />
    </el-form-item>
    <el-form-item
      label="Job Title"
      prop="job_title"
    >
      <el-input v-model="profile.job_title" />
    </el-form-item>
    <el-form-item
      label="Location (office)"
      prop="location_office"
    >
      <el-input v-model="profile.location_office" />
    </el-form-item>
    <el-form-item
      label="Location (position)"
      prop="location_position"
    >
      <el-input v-model="profile.location_position" />
    </el-form-item>
    <el-form-item
      label="State"
      prop="state"
    >
      <el-select
        v-model="profile.state"
        placeholder="Select a state"
        class="w-full"
      >
        <el-option
          v-for="item in stateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Is Admin"
      prop="is_admin"
    >
      <el-select
        v-model="profile.is_admin"
        placeholder="Whether is admin"
        class="w-full"
      >
        <el-option
          v-for="item in isAdminOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
      <el-form-item>
        <el-button
          v-if="drawer.type === 'edit'"
          type="success"
          @click="handleSave"
          class="justify-self-end"
        >
          <base-icon-text
            icon-class="fa-solid fa-check"
            text="Save"
          ></base-icon-text>
        </el-button>

        <el-button
          v-if="drawer.type === 'create'"
          type="success"
          @click="handleCreate(formRef)"
          class="justify-self-end"
          :loading="loading"
        >
          <base-icon-text
            icon-class="fa-solid fa-plus"
            text="Add"
          ></base-icon-text>
        </el-button>

        <el-button
          type="info"
          @click="handleCancel"
          class="justify-self-end"
        >
          <base-icon-text
            icon-class="fa-solid fa-xmark"
            text="Cancel"
          ></base-icon-text>
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { User } from '@/types/store/user.module.type'
import BaseIconText from '@/components/base/base-icon-text.vue'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import useUserDrawer from '@/hooks/useUserDrawer'
import { FormInstance } from 'element-plus'
import apis from '@/http/apis'
import { ElMessage } from 'element-plus/es'

export default defineComponent({
  name: 'user-drawer-profile-form',
  components: { BaseIconText },
  props: {
    user: {
      required: true,
      type: Object as PropType<User | null>
    }
  },
  emits: ['close'],
  setup: (props) => {
    const formRef = ref()

    const profile = reactive({
      name: props.user?.name || '',
      email: props.user?.email || '',
      department: props.user?.department || '',
      job_title: props.user?.job_title || '',
      location_office: props.user?.location_office || '',
      location_position: props.user?.location_position || '',
      state: props.user?.state || 1,
      is_admin: props.user?.is_admin || false
    })

    const loading = ref(false)

    const stateOptions = [
      { label: 'Left', value: 0 },
      { label: 'On Job', value: 1 }
    ]

    const isAdminOptions = [
      { label: 'True', value: true },
      { label: 'False', value: false }
    ]

    const rules = {
      name: [{ required: true, message: `Please input user's name` }],
      email: [
        { required: true, message: `Please input user's email` },
        { type: 'email', message: `Please input a valid email` }
      ],
      department: [{ required: true, message: `Please input user's department` }],
      job_title: [{ required: true, message: `Please input user's job title` }],
      location_office: [{ required: true, message: `Please input user's location (office)` }],
      location_position: [{ required: true, message: `Please input user's location (position)` }],
      state: [
        { required: true, message: `Please select user's working state` },
        { type: 'number', message: `Please select a valid option` }
      ],
      is_admin: [
        { required: true, message: `Please select whether the user is a admin` },
        { type: 'boolean', message: `Please select a valid option` }
      ]
    }

    const { drawer, openDrawer } = useUserDrawer()

    const handleSave = () => {
      openDrawer(ModuleDrawerType.SHOW)
    }

    const handleCreate = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid) {
          loading.value = true

          apis.user
            .createUser({ ...profile, password: 'password' })
            .then(() => {
              loading.value = false
              ElMessage({
                type: 'success',
                message: 'User added successfully.'
              })

              openDrawer(ModuleDrawerType.SHOW, profile)
            })
            .catch((error) => {
              loading.value = false

              const response = error.response.data

              if (response.status === 422) {
                ElMessage({
                  type: 'error',
                  message: response.message
                })
              } else {
                ElMessage({
                  type: 'error',
                  message: 'Something wrong during adding this user.'
                })
              }
            })
        }
      })
    }

    const handleCancel = () => {
      openDrawer(ModuleDrawerType.SHOW)
    }

    return {
      formRef,
      profile,
      loading,
      stateOptions,
      isAdminOptions,
      rules,
      handleSave,
      handleCreate,
      handleCancel,
      drawer
    }
  }
})
</script>

<style scoped></style>
