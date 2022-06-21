<template>
  <el-container>
    <el-header class="border-b"> Header </el-header>

    <el-container>
      <el-aside>
        <el-menu
          :collapse="false"
          :router="true"
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
            index="employees"
            :route="{ name: 'employees' }"
            :class="{ 'is-active': activeMenu === 'employees' }"
          >
            <template #title>
              <el-icon><i class="fa-solid fa-users"></i></el-icon>
              <span>Employees</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="software"
            :route="{ name: 'software' }"
            :class="{ 'is-active': activeMenu === 'software' }"
          >
            <template #title>
              <el-icon><i class="fa-brands fa-uncharted"></i></el-icon>
              <span>Software</span>
            </template>
          </el-menu-item>
          <el-menu-item
            index="hardware"
            :route="{ name: 'hardware' }"
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

export default defineComponent({
  name: 'the-app',
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

<style scoped lang="postcss">
.el-container,
.el-menu {
  height: 100%;
}
</style>
