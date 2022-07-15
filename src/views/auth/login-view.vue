<template>
  <el-container class="flex items-center justify-center h-full">
    <section class="w-1/2">
      <div class="w-20 mx-auto">
        <base-image src="logos/lifebyte-1.jpeg"></base-image>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        status-icon
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login(formRef)"
            :loading="form.submitting"
          >
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </section>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import BaseImage from '@/components/base/base-image.vue'
import { ElMessage, ElNotification, FormInstance } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { BaseImage },
  props: {},
  setup() {
    const store = useStore()
    const router = useRouter()

    const formRef = ref<FormInstance>()
    const form = reactive({
      email: '',
      password: '',
      submitting: false
    })

    const rules = {
      email: [
        { required: true, message: 'Please input your email' },
        { type: 'email', message: 'Please input a valid email' }
      ],
      password: [
        { required: true, message: 'Please input password' },
        { pattern: /^\S*$/, message: 'Password must not include whitespace' }
        // { pattern: /[A-Z]/, message: 'Please include at least 1 uppercase letter' },
        // { pattern: /[a-z]/, message: 'Please include at least 1 lower letter' },
        // { pattern: /\d/, message: 'Please include at least 1 number' },
        // { min: 8, max: 15, message: 'Password must be 8-15 characters in length' }
      ]
    }

    const login = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid) {
          form.submitting = true

          store
            .dispatch('auth/login', {
              email: form.email,
              password: form.password
            })
            .then(() => {
              router.push({ name: 'dashboard' })

              const user = computed(() => store.state.auth.user)
              ElNotification({
                type: 'success',
                title: `G'day ${user.value?.name}!`,
                message: 'Have a nice working day ^-^'
              })
            })
            .catch(() => {
              form.submitting = false

              ElMessage({
                type: 'error',
                message: 'Failed to login, please confirm your email and password.'
              })
            })
        }
      })
    }

    return { formRef, form, rules, login }
  }
})
</script>

<style scoped></style>
