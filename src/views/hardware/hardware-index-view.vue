<!--<template>-->
<!--  <the-content-header>-->
<!--    <hardware-list-header></hardware-list-header>-->
<!--  </the-content-header>-->
<!--  <el-container class="relative">-->
<!--    <el-container class="h-full overflow-y-auto">-->
<!--      <el-main>-->
<!--        <div class="relative flex flex-row flex-wrap">-->
<!--          <div class="flex w-full mb-4">-->
<!--            <div class="flex items-center">-->
<!--              <base-search-bar-->
<!--                placeholder="Type a name to search"-->
<!--                v-model:searchValue="table.filter.name"-->
<!--                @search="search"-->
<!--              ></base-search-bar>-->
<!--            </div>-->
<!--            <div class="flex flex-1 flex-nowrap justify-end items-center">-->
<!--              <base-pagination-->
<!--                :total="table.pagination.meta.total"-->
<!--                :page-size="table.pagination.meta.per_page"-->
<!--                :current-page="table.pagination.meta.current_page"-->
<!--                :from="table.pagination.meta.from"-->
<!--                :to="table.pagination.meta.to"-->
<!--                @current-change="handlePageChange"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->

<!--          <hardware-table-->
<!--            :data="table.data"-->
<!--            :loading="table.loading"-->
<!--            :error="table.error"-->
<!--          ></hardware-table>-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->
<!--    <the-right-aside>-->
<!--      <h1>Filter</h1>-->
<!--    </the-right-aside>-->
<!--  </el-container>-->
<!--</template>-->
<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>Hardware List</h1>
        <div class="flex flex-1 justify-end">
          <el-button
            type="success"
            class="mr-4"
            @click="newHardwareDialogVisible = true"
          >
            <base-icon-text
              icon-class="fa-solid fa-plus"
              text="New"
            ></base-icon-text>
          </el-button>

          <el-button-group>
            <el-button @click="handleImportClick">
              <base-icon-text
                icon-class="fa-solid fa-file-import"
                text="import"
              ></base-icon-text>
            </el-button>
            <el-button @click="handleExportClick">
              <base-icon-text
                icon-class="fa-solid fa-file-export"
                text="Export"
              ></base-icon-text>
            </el-button>
          </el-button-group>
        </div>
      </div>
    </template>

    <template #content>
      <el-container class="h-full">
        <el-main>
          <div>
            <!-- table tool bar -->
            <div class="flex flex-nowrap gap-x-4 items-center mb-2">
              <base-search-bar
                placeholder="Type a name to search"
                v-model:searchValue="table.filter.name"
                @search="search"
                class="w-auto"
              ></base-search-bar>
              <base-pagination
                :total="table.pagination.meta.total"
                :page-size="table.pagination.meta.per_page"
                :current-page="table.pagination.meta.current_page"
                :from="table.pagination.meta.from"
                :to="table.pagination.meta.to"
                @current-change="handlePageChange"
                class="flex-1 justify-end"
              />
            </div>
            <!-- table tool bar end -->

            <hardware-table
              :error="error.collection"
              :loading="loading.collection"
              :data="table.data"
            ></hardware-table>
          </div>
        </el-main>

        <the-right-aside> Filter </the-right-aside>
      </el-container>
    </template>
  </the-main-content>

  <!-- New hardware dialog -->
  <el-dialog
    v-model="newHardwareDialogVisible"
    title="New User"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    new hardware
  </el-dialog>
  <!-- New hardware dialog -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import { Hardware, HardwareFilter } from '@/types/store/hardware.module.type'
import HardwareTable from '@/components/modules/hardware/hardware-table.vue'
import { BasePaginationProps } from '@/types/components.type'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BasePagination from '@/components/base/base-pagination.vue'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import useHardware from '@/hooks/useHardware'
import BaseIconText from '@/components/base/base-icon-text.vue'

export default defineComponent({
  components: {
    BaseIconText,
    TheMainContent,
    BasePagination,
    BaseSearchBar,
    HardwareTable,
    TheRightAside
  },
  props: {},
  setup() {
    const { loading, error, getHardwareCollection } = useHardware()

    const table = reactive({
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
        model: '',
        serial_number: '',
        tag: '',
        spec_os: '',
        spec_cpu: '',
        spec_memory: '',
        spec_screen_size: ''
      })
    })

    const loadTable = (filter?: HardwareFilter) => {
      table.data = []

      getHardwareCollection(filter)
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

    const newHardwareDialogVisible = ref<boolean>(false)

    const handleImportClick = () => {}

    const handleExportClick = () => {}

    return {
      loading,
      error,
      table,
      search,
      handlePageChange,
      newHardwareDialogVisible,
      handleImportClick,
      handleExportClick
    }
  }
})
</script>

<style scoped></style>
