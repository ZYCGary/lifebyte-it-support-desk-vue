<template>
  <the-app active-menu="users">
    <template #heading>
      <h1>User List</h1>
    </template>
    <template #content>
      <el-container class="relative">
        <el-container class="h-full overflow-y-auto">
          <el-main>
            <div class="relative flex">
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
import TheApp from '@/components/base/the-app.vue'
import TheRightAside from '@/components/base/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'

export default defineComponent({
  components: { UserTable, TheRightAside, TheApp },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
