<template>
  <the-content-header>
    <user-list-header></user-list-header>
  </the-content-header>
  <el-container class="relative">
    <el-container class="h-full overflow-y-auto">
      <el-main>
        <div class="relative flex flex-row flex-wrap">
          <user-table></user-table>
        </div>
      </el-main>
    </el-container>
    <the-right-aside>
      <h1>Filter</h1>
    </the-right-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'
import UserListHeader from '@/components/modules/user/user-list-header.vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'

export default defineComponent({
  // eslint-disable-next-line vue/no-unused-components
  components: { TheContentHeader, UserListHeader, UserTable, TheRightAside },
  name: 'user-index-view',
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
