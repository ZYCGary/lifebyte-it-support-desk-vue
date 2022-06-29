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
          :current-page="pagination.current_page"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <el-table
      ref="multipleTableRef"
      :data="table.collection.data"
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
        property="job_title"
        label="Position"
        width="250"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="120"
      >
        <template #default="scope">
          <router-link :to="{ name: 'user-show', params: { id: scope.row.id } }">
            <el-tooltip
              content="View detail"
              placement="top"
              :show-after="500"
            >
              <base-button
                icon-class="fa-solid fa-id-card"
                type="primary"
                :text="false"
              >
              </base-button>
            </el-tooltip>
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
import { computed, reactive, ref } from 'vue'
import { BaseTableProps } from '@/types/components.type'
import BasePagination from '@/components/base/base-pagination.vue'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BaseButton from '@/components/base/base-button.vue'
import { User } from '@/types/store/user.module.type'

export default {
  name: 'user-table',
  components: { BaseButton, BaseSearchBar, BasePagination },
  setup: () => {
    const table: BaseTableProps = reactive({
      loading: true,
      error: false,
      collection: {
        data: [] as User[],
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
      page_size: computed(() => table.collection.meta.per_page),
      current_page: computed(() => table.collection.meta.current_page)
    })

    const searchValue = ref('')

    const loadTable = (param?: { page?: number; name?: string }) => {
      table.loading = true
      table.error = false
      table.collection.data = []

      apis.user
        .getUserTable(param)
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

    return { table, pagination, handlePageChange, search, searchValue }
  }
}
</script>

<style scoped></style>
