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
              :loading="loading.collection"
              :error="error.collection"
            ></user-table>
          </div>
        </el-main>
        <the-right-aside>
          <user-list-filter
            :filter="table.filter"
            @filter="handleFilter"
          ></user-list-filter>
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
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BasePagination from '@/components/base/base-pagination.vue'
import { User, UserFilter } from '@/types/store/user.module.type'
import UserListFilter from '@/components/modules/user/user-list-filter.vue'
import useUser from '@/hooks/useUser'

export default defineComponent({
  components: {
    UserListFilter,
    BasePagination,
    BaseSearchBar,
    TheMainContent,
    UserListHeader,
    UserTable,
    TheRightAside
  },
  name: 'user-index-view',
  props: {},
  setup() {
    const { loading, error, getUserCollection } = useUser()

    const table = reactive({
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
      filter: {
        page: 1,
        name: '',
        email: '',
        department: '',
        job_title: '',
        company: '',
        type: '',
        location_id: '',
        desk: '',
        state: '',
        permission_level: ''
      } as UserFilter
    })

    const loadTable = (filter?: UserFilter) => {
      table.data = []

      getUserCollection(filter)
        .then((collection) => {
          table.data = collection.data
          table.pagination.links = collection.pagination.links
          table.pagination.meta = collection.pagination.meta
        })
        .catch(() => {})
    }

    loadTable()

    const search = () => {
      loadTable({ page: 1, name: table.filter.name })
    }

    const handlePageChange = (page: number) => {
      table.filter.page = page
      loadTable(table.filter)
    }

    const handleFilter = (filter: UserFilter) => {
      table.filter = filter
      loadTable(filter)
    }

    return { loading, error, table, search, handlePageChange, handleFilter }
  }
})
</script>

<style scoped></style>
