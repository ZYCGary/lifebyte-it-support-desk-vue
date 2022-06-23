<template>
  <div>
    <div class="flex w-full mb-4">
      <div class="flex flex-1 flex-nowrap justify-end items-center">
        <el-pagination
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.page_size"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <el-table
      ref="multipleTableRef"
      :data="table.collection.data"
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
        {{ table.loading ? 'Loading data...' : table.error ? 'Failed to load data' : 'No data' }}
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import apis from '@/http/apis'
import { computed, reactive } from 'vue'
import { BaseTableProps } from '@/types/components.type'

export default {
  name: 'user-table',
  setup: () => {
    const table: BaseTableProps = reactive({
      loading: true,
      error: false,
      collection: {
        data: [],
        links: {
          first: null,
          last: null,
          next: null,
          prev: null
        },
        meta: {
          current_page: 1,
          per_page: 15,
          last_page: 1,
          total: 0,
          from: 0,
          to: 0,
          links: []
        }
      }
    })

    const pagination = reactive({
      total: computed(() => table.collection.meta.total),
      page_size: computed(() => table.collection.meta.per_page)
    })

    const loadTable = (param?: { page: number }) => {
      table.loading = true
      table.error = false
      table.collection.data = []

      apis.user
        .getUserCollection(param)
        .then((response) => {
          table.loading = false
          table.error = false
          table.collection = {
            data: response.data,
            links: response.links,
            meta: response.meta
          }
        })
        .catch(() => {
          table.loading = false
          table.error = true
        })
    }

    loadTable()

    const handlePageChange = (page: number) => {
      loadTable({ page: page })
    }

    return { table, pagination, handlePageChange }
  }
}
</script>

<style scoped></style>
