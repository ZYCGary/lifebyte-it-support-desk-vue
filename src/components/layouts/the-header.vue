<template>
  <el-header class="flex flex-row flex-nowrap items-center border-b py-2 bg-blue-400">
    <div>
      <base-image src="logos/lifebyte-2.webp"></base-image>
    </div>
    <div class="flex flex-1 justify-end">
      <el-dropdown trigger="click">
        <span class="w-9 h-9 rounded-full bg-green-600/70 leading-9 font-bold text-center text-xl text-white">
          {{ initial }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item divided>
              <el-button
                type="danger"
                :loading="status.logging_out"
                @click="logout"
              >
                {{ status.logging_out ? 'Logging Out' : 'Logout' }}
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import BaseImage from '@/components/base/base-image.vue'
import { useStore } from '@/store'
import { computed, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'the-header',
  components: { BaseImage },
  setup: () => {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.state.auth.user)

    const initial = user.value.name[0].toUpperCase()

    const status = reactive({
      logging_out: false
    })

    const logout = () => {
      status.logging_out = true

      store
        .dispatch('auth/logout')
        .then(() => {
          status.logging_out = false

          router.push({ name: 'auth.login' })
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to logout.'
          })

          status.logging_out = false
        })
    }

    return { initial, status, logout }
  }
})
</script>

<style scoped></style>
