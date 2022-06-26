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
        v-if="drawer.type === 'show'"
      >
        <h1 class="font-bold text-2xl text-black">{{ drawer.user?.name }}</h1>
      </template>

      <user-drawer-profile></user-drawer-profile>

      <div v-if="drawer.type !== 'show'">
        <el-form> </el-form>
      </div>

      <el-divider></el-divider>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import UserDrawerProfile from '@/components/modules/user/user-drawer-profile.vue'
import { useStore } from '@/store'
import { ModuleDrawerType } from '@/types/enums/components.enum'

export default defineComponent({
  name: 'user-drawer',
  components: { UserDrawerProfile },
  setup: () => {
    const store = useStore()

    const drawer = computed({
      get: () => store.state.user.drawer,
      set: (value) => {
        console.log('set drawer', value)
        store.commit('user/setDrawer', value)
      }
    })

    // Key used to force update drawer.
    const key = ref(0)

    watch(
      drawer.value,
      (newValue, oldValue) => {
        if (newValue.open === oldValue.open) key.value += 1
      },
      { deep: true }
    )

    const handleClosed = () => {
      store.commit('user/closeDrawer')
      store.commit('user/setDrawerType', ModuleDrawerType.SHOW)
      store.commit('user/setDrawerUser', null)
    }

    return { drawer, key, handleClosed }
  }
})
</script>

<style scoped></style>
