<template>
  <the-main-content>
    <template #header>
      <user-list-header></user-list-header>
    </template>

    <template #content>
      <el-container class="h-full">
        <el-main>
          <div class="relative flex flex-row flex-wrap">
            <user-table></user-table>
          </div>
        </el-main>
        <the-right-aside>
          <h1>Filter</h1>
        </the-right-aside>
      </el-container>
    </template>
  </the-main-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'
import UserListHeader from '@/components/modules/user/user-list-header.vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'
import TheMainContent from '@/components/layouts/the-main-content.vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { TheMainContent, TheContentHeader, UserListHeader, UserTable, TheRightAside },
  name: 'user-index-view',
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
