<template>
  <div v-show="drawer.user">
    <el-drawer
      v-model="drawer.open"
      :destroy-on-close="false"
      :size="800"
      :key="key"
      :before-close="handleBeforeClose"
      @closed="handleClosed"
    >
      <template #header>
        <div
          class="flex items-center"
          v-if="drawer.type === 'show'"
        >
          <base-avatar
            :name="drawer.user?.name"
            class="inline-block mr-3"
          ></base-avatar>
          <h1 class="font-bold text-2xl text-black">
            {{ drawer.user?.name }}
          </h1>
        </div>
        <h1
          class="font-bold text-2xl text-black"
          v-if="drawer.type === 'edit'"
        >
          Update User
        </h1>
        <h1
          class="font-bold text-2xl text-black"
          v-if="drawer.type === 'create'"
        >
          New User
        </h1>
      </template>

      <user-drawer-profile></user-drawer-profile>

      <el-divider></el-divider>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserDrawerProfile from '@/components/modules/user/user-drawer-profile.vue'
import useUserDrawer from '@/hooks/useUserDrawer'
import BaseAvatar from '@/components/base/base-avatar.vue'
import { ModuleDrawerType } from '@/types/enums/components.enum'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'user-drawer',
  components: { BaseAvatar, UserDrawerProfile },
  setup: () => {
    const { drawer, closeDrawer } = useUserDrawer()

    // Key used to force update drawer.
    const key = ref(0)

    const handleBeforeClose = (done: () => void) => {
      if (drawer.value.type === ModuleDrawerType.SHOW) {
        done()
      } else {
        ElMessageBox.confirm('Content edited will not be saved. Continue?', 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(() => {
            done()
          })
          .catch()
      }
    }

    const handleClosed = () => {
      key.value += 1
      closeDrawer()
    }

    return { drawer, key, handleBeforeClose, handleClosed }
  }
})
</script>

<style scoped></style>
