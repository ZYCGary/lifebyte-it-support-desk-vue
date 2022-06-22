<template>
  <el-table
    ref="multipleTableRef"
    :data="table.data"
    height="776px"
    border
    flexible
    fit
    lazy
    class="overflow-auto w-auto max-h-full"
  >
    <el-table-column
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      property="name"
      label="Name"
      width="250"
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
      fixed="right"
      label="Operations"
      width="120"
    >
      <template #default>
        <router-link :to="{ name: 'dashboard' }">
          <el-button type="primary"> View </el-button>
        </router-link>
      </template>
    </el-table-column>

    <template #empty>
      {{ table.loading ? 'Loading Data' : 'No Data' }}
    </template>
  </el-table>
</template>

<script>
import apis from '@/http/apis'
import { reactive } from 'vue'

export default {
  name: 'user-table',
  setup: () => {
    const table = reactive({
      loading: true,
      data: [],
      links: {},
      meta: {},
      error: false
    })

    apis.user
      .getUserTable()
      .then((response) => {
        table.loading = false
        table.data = response.data
        table.links = response.links
        table.meta = response.meta
        table.error = false
      })
      .catch(() => {
        table.loading = false
        table.data = []
        table.links = {}
        table.meta = {}
        table.error = true
      })

    return { table }
  }
}
</script>

<style scoped></style>
