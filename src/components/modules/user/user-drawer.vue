<template>
  <div>
    <el-drawer
      v-model="drawer.open"
      @closed="handleClosed"
      destroy-on-close
      :size="800"
      :key="key"
    >
      <template
        #header
        v-if="drawer.type === 'show' && drawer.user"
      >
        <h1 class="font-bold text-2xl text-black">{{ drawer.user?.name }}</h1>
      </template>

      <template v-if="drawer.user">
        <user-drawer-profile></user-drawer-profile>

        <el-divider></el-divider>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserDrawerProfile from '@/components/modules/user/user-drawer-profile.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user-drawer',
  components: { UserDrawerProfile },
  setup: () => {
    const store = useStore()

    const drawer = computed(() => store.state.user.drawer)

    // Key used to force update drawer.
    const key = ref(0)

    const handleClosed = () => {
      key.value += 1
      store.commit('user/closeDrawer')
    }

    return { drawer, key, handleClosed }
  }
})
</script>

<style scoped></style>
