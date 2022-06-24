<template>
  <div>
    <div class="flex w-full mb-4">
      <div class="flex items-center">
        <base-search-bar
          placeholder="Type a name to search"
          v-model:searchValue="searchValue"
          @search="search"
        ></base-search-bar>
      </div>
      <div class="flex flex-1 flex-nowrap justify-end items-center">
        <base-pagination
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
        fixed="right"
        label="Operations"
        width="120"
      >
        <template #default="scope">
          <el-button
            type="primary"
            @click="viewUser(scope.row)"
            >View</el-button
          >
        </template>
      </el-table-column>

      <template #empty>
        {{ table.loading ? 'Loading data...' : table.error ? 'Failed to load data' : 'No data' }}
      </template>
    </el-table>
  </div>

  <user-drawer
    v-model:show="drawer.show"
    v-model:user="drawer.user"
  ></user-drawer>
</template>

<script lang="ts">
import apis from '@/http/apis'
import { computed, reactive, ref } from 'vue'
import { BaseTableProps } from '@/types/components.type'
import BasePagination from '@/components/base/base-pagination.vue'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import UserDrawer from '@/components/modules/user/user-drawer.vue'
import { User } from '@/types/store/user.module.type'

export default {
  name: 'user-table',
  components: { UserDrawer, BaseSearchBar, BasePagination },
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

    const searchValue = ref('')

    const loadTable = (param?: { page?: number; name?: string }) => {
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
      loadTable({ page: page, name: searchValue.value || '' })
    }

    const search = () => {
      loadTable({ page: 1, name: searchValue.value || '' })
    }

    const drawer = reactive({
      show: false,
      user: {}
    })

    const viewUser = (row: User) => {
      drawer.show = true
      drawer.user = row
    }

    return { table, pagination, handlePageChange, search, drawer, viewUser, searchValue }
  }
}
</script>

<style scoped></style>
