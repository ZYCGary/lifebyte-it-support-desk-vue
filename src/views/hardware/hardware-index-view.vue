<template>
  <the-content-header>
    <hardware-list-header></hardware-list-header>
  </the-content-header>
  <el-container class="relative">
    <el-container class="h-full overflow-y-auto">
      <el-main>
        <div class="relative flex flex-row flex-wrap">
          <div class="flex w-full mb-4">
            <div class="flex items-center">
              <base-search-bar
                placeholder="Type a name to search"
                v-model:searchValue="table.filter.name"
                @search="search"
              ></base-search-bar>
            </div>
            <div class="flex flex-1 flex-nowrap justify-end items-center">
              <base-pagination
                :total="table.pagination.meta.total"
                :page-size="table.pagination.meta.per_page"
                :current-page="table.pagination.meta.current_page"
                @current-change="handlePageChange"
              />
            </div>
          </div>

          <hardware-table
            :data="table.data"
            :loading="table.loading"
            :error="table.error"
          ></hardware-table>
        </div>
      </el-main>
    </el-container>
    <the-right-aside>
      <h1>Filter</h1>
    </the-right-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'
import HardwareListHeader from '@/components/modules/hardware/hardware-list-header.vue'
import { Hardware, HardwareFilter } from '@/types/store/hardware.module.type'
import HardwareTable from '@/components/modules/hardware/hardware-table.vue'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BasePagination from '@/components/base/base-pagination.vue'

export default defineComponent({
  components: { BasePagination, BaseSearchBar, HardwareTable, HardwareListHeader, TheContentHeader, TheRightAside },
  props: {},
  setup() {
    const table = reactive({
      loading: true,
      error: false,
      data: [] as Hardware[],
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
      filter: reactive<HardwareFilter>({
        page: 1,
        name: '',
        type: '',
        brand: '',
        serial_number: '',
        tag: '',
        spec_os: '',
        spec_cpu: '',
        spec_memory: '',
        spec_screen_size: '',
        spec_ports: [],
        spec_adapter_input: '',
        spec_adapter_output: [],
        spec_cable_length: ''
      })
    })

    const loadTable = (filter?: HardwareFilter) => {
      table.loading = true
      table.error = false
      table.data = []

      apis.hardware
        .getHardwareCollection(filter)
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

    loadTable(table.filter)

    const search = () => {
      loadTable({ page: 1, name: table.filter.name })
    }

    const handlePageChange = (page: number) => {
      console.log(page)
      table.filter.page = page
      loadTable(table.filter)
    }

    return { table, search, handlePageChange }
  }
})
</script>

<style scoped></style>
