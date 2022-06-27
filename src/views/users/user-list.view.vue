<template>
  <the-app active-menu="users">
    <template #heading>
      <user-list-header></user-list-header>
    </template>
    <template #content>
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
  </the-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheApp from '@/components/layouts/the-app.vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'
import UserListHeader from '@/components/modules/user/user-list-header.vue'

export default defineComponent({
  components: { UserListHeader, UserTable, TheRightAside, TheApp },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
