<template>
  <the-main-content>
    <template #header>
      <user-list-header></user-list-header>
    </template>

    <template #content>
      <el-container class="h-full">
        <el-main>
          <div class="relative flex flex-row flex-wrap">
            <!-- table tool bar -->
            <div class="flex flex-nowrap gap-x-4 items-center mb-2">
              <base-search-bar
                placeholder="Type a name to search"
                v-model:searchValue="table.filter.name"
                @search="search"
              ></base-search-bar>
              <base-pagination
                :total="table.pagination.meta.total"
                :page-size="table.pagination.meta.per_page"
                :current-page="table.pagination.meta.current_page"
                @current-change="handlePageChange"
              />
            </div>
            <!-- table tool bar end -->

            <user-table
              :data="table.data"
              :loading="table.loading"
              :error="table.error"
            ></user-table>
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
import { defineComponent, reactive } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'
import UserListHeader from '@/components/modules/user/user-list-header.vue'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BasePagination from '@/components/base/base-pagination.vue'
import { User, UserFilter } from '@/types/store/user.module.type'

export default defineComponent({
  components: { BasePagination, BaseSearchBar, TheMainContent, UserListHeader, UserTable, TheRightAside },
  name: 'user-index-view',
  props: {},
  setup() {
    const table = reactive({
      loading: true,
      error: false,
      data: [] as User[],
      pagination: {
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
      } as BasePaginationProps,
      filter: reactive<UserFilter>({
        page: 1,
        name: null,
        email: null,
        department: null,
        job_title: null,
        company: null,
        type: null,
        location_id: null,
        desk: null,
        state: null,
        permission_level: null
      })
    })

    const loadTable = (filter?: UserFilter) => {
      table.loading = true
      table.error = false
      table.data = []

      apis.user
        .getUserCollection(filter)
        .then((collection) => {
          table.loading = false
          table.error = false
          table.data = collection.data
          table.pagination.links = collection.links
          table.pagination.meta = collection.meta
        })
        .catch(() => {
          table.loading = false
          table.error = true
        })
    }

    loadTable()

    const search = () => {
      loadTable({ page: 1, name: table.filter.name })
    }

    const handlePageChange = (page: number) => {
      table.filter.page = page
      loadTable(table.filter)
    }

    return { table, search, handlePageChange }
  }
})
</script>

<style scoped></style>
