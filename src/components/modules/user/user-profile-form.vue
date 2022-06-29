<template>
  <el-form
    ref="formRef"
    :model="profile"
    :rules="rules"
    label-position="top"
    status-icon
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
      label="Location"
      prop="location_office"
    >
      <el-input v-model="profile.location_office" />
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
    <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
      <el-form-item>
        <base-button
          icon-class="fa-solid fa-check"
          type="success"
          :loading="loading"
          @click="handleSave(formRef)"
        >
          Save
        </base-button>
        <base-button
          icon-class="fa-solid fa-ban"
          type="info"
          @click="handleCancel"
        >
          Cancel
        </base-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { User } from '@/types/store/user.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import apis from '@/http/apis'
import { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'user-profile-form',
  components: { BaseButton },
  emits: ['cancel', 'success'],
  props: {
    type: {
      require: true,
      type: String as PropType<'create' | 'update'>
    },
    user: {
      required: true,
      type: Object as PropType<User>
    }
  },
  setup: (props, { emit }) => {
    const formRef = ref()

    const profile = reactive({ ...props.user })

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

    const handleCancel = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          formRef.value?.resetFields()
          emit('cancel')
        })
        .catch()
    }

    const loading = ref(false)

    const createUser = () => {
      apis.user
        .createUser({ ...profile, password: 'password' })
        .then((newUser) => {
          loading.value = false

          ElMessage({
            type: 'success',
            message: 'Add user successfully.'
          })

          emit('success', newUser)
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

    const updateUser = () => {
      apis.user
        .updateUser(props.user.id, { ...profile })
        .then(() => {
          loading.value = false

          ElMessage({
            type: 'success',
            message: 'Update user profile successfully.'
          })

          emit('success', profile)
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
              message: 'Something wrong when updating user profile.'
            })
          }
        })
    }

    const handleSave = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      if (!props.type || (props.type !== 'create' && props.type !== 'update')) handleCancel()

      formEl.validate((valid) => {
        if (valid) {
          loading.value = true

          if (props.type === 'update') updateUser()
          if (props.type === 'create') createUser()
        }
      })
    }

    return { formRef, profile, stateOptions, rules, isAdminOptions, loading, handleSave, handleCancel }
  }
})
</script>

<style scoped></style>
