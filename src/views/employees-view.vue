<template>
  <the-app active-menu="employees">
    <template #heading>
      <h1>Employees</h1>
    </template>
    <template #content>
      <el-container class="overflow-y-auto">
        <el-container>
          <el-main>
            <div class="relative h-[690px]">
              <employee-table></employee-table>
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
import EmployeeTable from '@/components/modules/employee/employee-table.vue'

export default defineComponent({
  name: 'DashboardView',
  components: { EmployeeTable, TheRightAside, TheApp },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
