<template>
  <el-header class="flex flex-row flex-nowrap items-center border-b py-2 bg-blue-400">
    <div>
      <base-image src="logos/lifebyte-2.webp"></base-image>
    </div>
    <div class="flex flex-1 justify-end">
      <el-dropdown trigger="click">
        <span class="w-9 h-9 rounded-full bg-green-600/70 leading-9 font-bold text-center text-xl text-white">{{
          initial
        }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item divided>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import BaseImage from '@/components/base/base-image.vue'
import { useStore } from '@/store'
import { computed } from 'vue'

export default {
  name: 'base-header',
  components: { BaseImage },
  setup: () => {
    const store = useStore()
    const user = computed(() => store.state.auth.user)

    const initial = user.value.name[0].toUpperCase()

    return { initial }
  }
}
</script>

<style scoped></style>
