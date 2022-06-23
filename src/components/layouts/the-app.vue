<template>
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
              <el-icon><i class="fa-solid fa-gauge"></i></el-icon>
              <span>Dashboard</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="users"
            :route="{ name: 'user-list' }"
            :class="{ 'is-active': activeMenu === 'users' }"
          >
            <template #title>
              <el-icon><i class="fa-solid fa-users"></i></el-icon>
              <span>Users</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="software"
            :route="{ name: 'software-list' }"
            :class="{ 'is-active': activeMenu === 'software' }"
          >
            <template #title>
              <el-icon><i class="fa-brands fa-uncharted"></i></el-icon>
              <span>Software</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="hardware"
            :route="{ name: 'hardware-list' }"
            :class="{ 'is-active': activeMenu === 'hardware' }"
          >
            <template #title>
              <el-icon><i class="fa-solid fa-computer"></i></el-icon>
              <span>Hardware</span>
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
import { defineComponent } from 'vue'
import TheHeader from '@/components/layouts/the-header.vue'

export default defineComponent({
  name: 'the-app',
  components: { TheHeader },
  props: {
    activeMenu: {
      required: true,
      type: String,
      default: 'dashboard'
    }
  },
  setup() {}
})
</script>

<style scoped lang="postcss"></style>
