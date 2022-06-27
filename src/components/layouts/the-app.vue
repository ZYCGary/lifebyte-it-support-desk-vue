<template>
  <template v-if="isAdmin"></template>
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
            :route="{ name: 'user-list' }"
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
            :route="{ name: 'software-list' }"
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
            :route="{ name: 'hardware-list' }"
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
        <div class="border-b px-5 py-3">
          <slot name="heading"></slot>
        </div>
        <slot name="content"></slot>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TheHeader from '@/components/layouts/the-header.vue'
import { useStore } from '@/store'
import BaseIconText from '@/components/base/base-icon-text.vue'

export default defineComponent({
  name: 'the-app',
  components: { BaseIconText, TheHeader },
  props: {
    activeMenu: {
      required: true,
      type: String,
      default: 'dashboard'
    }
  },
  setup() {
    const store = useStore()

    const isAdmin = computed(() => store.getters['auth/isAdmin'])

    return { isAdmin }
  }
})
</script>

<style scoped lang="postcss"></style>
