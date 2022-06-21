<template>
  <el-table
    ref="multipleTableRef"
    :data="list.data"
    height="100%"
    border
    flexible
    fit
    style="width: 100%"
    class="overflow-auto max-h-full"
  >
    <el-table-column
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      property="name"
      label="Name"
      width="200"
      fixed
    ></el-table-column>
    <el-table-column
      property="email"
      label="Email"
      width="300"
    ></el-table-column>
    <el-table-column
      property="department"
      label="Department"
      width="200"
    ></el-table-column>
    <el-table-column
      property="job_title"
      label="Job Title"
      width="200"
    ></el-table-column>
    <el-table-column
      property="location_office"
      label="Office"
      width="100"
    ></el-table-column>
    <el-table-column
      property="location_position"
      label="Position"
      width="150"
    ></el-table-column>
    <el-table-column
      property="state"
      label="State"
      width="100"
    ></el-table-column>
    <el-table-column
      property="is_admin"
      label="Is Admin"
      width="100"
    ></el-table-column>
    <el-table-column
      property="created_at"
      label="Created At"
      width="150"
    ></el-table-column>
    <el-table-column
      property="updated_at"
      label="Updated At"
      width="150"
    ></el-table-column>
  </el-table>
</template>

<script>
import apis from '@/http/apis'
import { reactive } from 'vue'

export default {
  name: 'employee-table',
  setup: () => {
    const list = reactive({
      loading: true,
      data: [],
      links: {},
      meta: {},
      error: false
    })

    apis.employee
      .getEmployeeList()
      .then((response) => {
        list.loading = false
        list.data = response.data
        list.links = response.links
        list.meta = response.meta
        list.error = false
      })
      .catch(() => {
        list.loading = false
        list.data = []
        list.links = {}
        list.meta = {}
        list.error = true
      })

    return { list }
  }
}
</script>

<style scoped></style>
