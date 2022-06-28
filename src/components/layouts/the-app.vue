<template>
  <template v-if="isAdmin">
    <el-container
      direction="vertical"
      class="h-full"
    >
      <the-header></the-header>

      <el-container class="relative">
        <el-aside>
          <el-menu
            :collapse="false"
            :router="true"
            class="h-full"
          >
            <el-menu-item
              index="dashboard"
              :route="{ name: 'dashboard' }"
              :class="{ 'is-active': activeMenu === 'dashboard' }"
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
              :route="{ name: 'user-index' }"
              :class="{ 'is-active': activeMenu === 'users' }"
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
              :route="{ name: 'software-index' }"
              :class="{ 'is-active': activeMenu === 'software' }"
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
              :route="{ name: 'hardware-index' }"
              :class="{ 'is-active': activeMenu === 'hardware' }"
            >
              <template #title>
                <base-icon-text
                  text="Hardware"
                  icon-class="fa-solid fa-computer"
                ></base-icon-text>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container direction="vertical">
          <router-view :key="$route.path"></router-view>
        </el-container>
      </el-container>
    </el-container>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from 'vue'
import TheHeader from '@/components/layouts/the-header.vue'
import { useStore } from '@/store'
import BaseIconText from '@/components/base/base-icon-text.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'the-app',
  components: { BaseIconText, TheHeader },
  props: {},
  setup() {
    const store = useStore()

    const isAdmin = computed(() => store.getters['auth/isAdmin'])

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

    return { isAdmin, activeMenu }
  }
})
</script>

<style scoped lang="postcss"></style>
