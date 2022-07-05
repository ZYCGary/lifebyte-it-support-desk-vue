<template>
  <el-form
    v-if="form.show"
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
      label="Desk"
      prop="desk"
    >
      <el-input v-model="profile.desk" />
    </el-form-item>
    <el-form-item
      label="Company"
      prop="company"
    >
      <el-select
        v-model="profile.company"
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
        v-model="profile.location"
        value-key="id"
        placeholder="Select a location"
        class="w-full"
      >
        <el-option
          v-for="item in form.locationOptions"
          :key="item['id']"
          :label="`${item['name']} - ${item['country']}`"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Type"
      prop="type"
    >
      <el-select
        v-model="profile.type"
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
        v-model="profile.state"
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
        v-model="profile.permission_level"
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
    <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
      <el-form-item>
        <base-button
          icon-class="fa-solid fa-check"
          type="success"
          :loading="form.submitting"
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
  <div
    v-loading="form.loading"
    v-show="!form.show"
    class="h-72"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from 'vue'
import { User } from '@/types/store/user.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import apis from '@/http/apis'
import { FormInstance } from 'element-plus'
import { useStore } from '@/store'

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

    const form = reactive({
      loading: true,
      show: false,
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
      submitting: false
    })

    const rules = {
      name: [{ required: true, message: `Please input user's name` }],
      email: [
        { required: true, message: `Please input user's email` },
        { type: 'email', message: `Please input a valid email` }
      ],
      company: [{ required: true, message: `Please select/input user's company` }],
      location: [{ required: true, message: `Please select user's location` }],
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

    const store = useStore()

    const isSuperAdmin = computed(() => store.getters['auth/isSuperAdmin'])

    apis.location
      .getAllLocations()
      .then((locations: Location[]) => {
        form.loading = false
        form.show = true
        form.locationOptions = locations
      })
      .catch(() => {
        form.loading = false
        ElMessage({
          type: 'error',
          message: 'Failed to load edit form, please try again later.'
        })
        emit('cancel')
      })

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

    const createUser = () => {
      apis.user
        .createUser({ ...profile, password: 'password' })
        .then((newUser) => {
          form.submitting = false

          ElMessage({
            type: 'success',
            message: 'Add user successfully.'
          })

          emit('success', newUser)
        })
        .catch((error) => {
          form.submitting = false

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
          form.submitting = false

          ElMessage({
            type: 'success',
            message: 'Update user profile successfully.'
          })

          emit('success', profile)
        })
        .catch((error) => {
          form.submitting = false

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
          form.submitting = true

          if (props.type === 'update') updateUser()
          if (props.type === 'create') createUser()
        }
      })
    }

    return { formRef, profile, form, rules, isSuperAdmin, handleSave, handleCancel }
  }
})
</script>

<style scoped></style>
