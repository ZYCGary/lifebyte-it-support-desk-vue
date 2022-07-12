<template>
  <aside class="fixed w-72 left-0 top-14 bottom-0">
    <el-menu
      :collapse="false"
      :router="true"
      class="min-h-full"
    >
      <el-menu-item
        index="dashboard"
        :route="{ name: 'dashboard' }"
        :class="{ 'is-active': activeMenu === 'dashboard' }"
        @click="activeMenu = 'dashboard'"
      >
        <template #title>
          <base-icon-text
            text="Dashboard"
            icon-class="fa-solid fa-gauge"
          ></base-icon-text>
        </template>
      </el-menu-item>
      <el-menu-item
        index="users"
        :route="{ name: 'user.index' }"
        :class="{ 'is-active': activeMenu === 'users' }"
        @click="activeMenu = 'users'"
      >
        <template #title>
          <base-icon-text
            text="Users"
            icon-class="fa-solid fa-users"
          ></base-icon-text>
        </template>
      </el-menu-item>
      <el-menu-item
        index="software"
        :route="{ name: 'software.index' }"
        :class="{ 'is-active': activeMenu === 'software' }"
        @click="activeMenu = 'software'"
      >
        <template #title>
          <base-icon-text
            text="Software"
            icon-class="fa-brands fa-uncharted"
          ></base-icon-text>
        </template>
      </el-menu-item>
      <el-menu-item
        index="hardware"
        :route="{ name: 'hardware.index' }"
        :class="{ 'is-active': activeMenu === 'hardware' }"
        @click="activeMenu = 'hardware'"
      >
        <template #title>
          <base-icon-text
            text="Hardware"
            icon-class="fa-solid fa-computer"
          ></base-icon-text>
        </template>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseIconText from '@/components/base/base-icon-text.vue'

export default defineComponent({
  name: 'the-side-menu',
  components: { BaseIconText },
  setup: () => {
    const activeMenu = ref('dashboard')
    const switchActiveMenu = () => {
      const route = useRoute()
      const routeName = route.name as String

      if (routeName) {
        switch (true) {
          case routeName.startsWith('user'):
            activeMenu.value = 'users'
            break

          case routeName.startsWith('hardware'):
            activeMenu.value = 'hardware'
            break

          case routeName.startsWith('software'):
            activeMenu.value = 'software'
            break

          default:
            activeMenu.value = 'dashboard'
            break
        }
      } else {
        activeMenu.value = 'dashboard'
      }
    }

    switchActiveMenu()

    onUpdated(() => {
      switchActiveMenu()
    })

    return { activeMenu }
  }
})
</script>

<style scoped></style>
