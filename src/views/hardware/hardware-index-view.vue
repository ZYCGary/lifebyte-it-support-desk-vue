<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>Hardware List</h1>
        <div class="flex flex-1 justify-end">
          <base-button
            icon-class="fa-solid fa-plus"
            type="success"
            class="mr-4"
            @click="newHardwareDialogVisible = true"
          >
            New
          </base-button>

          <el-button-group>
            <base-button
              icon-class="fa-solid fa-file-import"
              @click="importHardwareDialogVisible = true"
            >
              Import
            </base-button>
            <base-button
              icon-class="fa-solid fa-file-export"
              :loading="loading.export"
              @click="handleExportClick"
            >
              Export
            </base-button>
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
              @hardware-updated="handleHardwareUpdated"
              @hardware-returned="handleHardwareReturned"
            ></hardware-table>
          </div>
        </el-main>

        <the-right-aside>
          <hardware-list-filter
            :filter="table.filter"
            @filter="handleFilter"
          ></hardware-list-filter>
        </the-right-aside>
      </el-container>
    </template>
  </the-main-content>

  <!-- New hardware dialog -->
  <el-dialog
    v-model="newHardwareDialogVisible"
    title="New Hardware"
    :destroy-on-close="true"
    :before-close="closeNewHardwareDialog"
  >
    <hardware-form-create
      @cancel="closeNewHardwareDialog"
      @created="handleHardwareCreated"
    ></hardware-form-create>
  </el-dialog>
  <!-- New hardware dialog end -->

  <!-- Import hardware dialog -->
  <el-dialog
    v-model="importHardwareDialogVisible"
    title="Import Hardware"
    :destroy-on-close="true"
  >
    <base-upload
      url="/api/v1/hardware/import"
      @success="handleHardwareImported"
      @error="handleHardwareImportError"
    ></base-upload>
  </el-dialog>
  <!-- Import hardware dialog end -->
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
import HardwareListFilter from '@/components/modules/hardware/hardware-list-filter.vue'
import { UserFilter } from '@/types/store/user.module.type'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import HardwareFormCreate from '@/components/modules/hardware/hardware-form-create.vue'
import BaseButton from '@/components/base/base-button.vue'
import BaseUpload from '@/components/base/base-upload.vue'

export default defineComponent({
  components: {
    BaseUpload,
    BaseButton,
    HardwareFormCreate,
    HardwareListFilter,
    TheMainContent,
    BasePagination,
    BaseSearchBar,
    HardwareTable,
    TheRightAside
  },
  props: {},
  setup() {
    const { loading, error, getHardwareCollection, exportHardware } = useHardware()

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
        spec_memory: 0,
        spec_storage: 0,
        spec_screen_size: 0
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

    const handleHardwareUpdated = () => {
      loadTable(table.filter)
    }

    const handleFilter = (filter: UserFilter) => {
      table.filter = filter
      loadTable(filter)
    }

    const newHardwareDialogVisible = ref<boolean>(false)

    const closeNewHardwareDialog = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          newHardwareDialogVisible.value = false
        })
        .catch(() => {})
    }

    const handleHardwareCreated = () => {
      newHardwareDialogVisible.value = false
      loadTable()
    }

    const handleHardwareReturned = () => {
      loadTable(table.filter)
    }

    const handleImportClick = () => {}

    const handleExportClick = () => {
      exportHardware()
        .then()
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to export hardware.'
          })
        })
    }

    const importHardwareDialogVisible = ref<boolean>(false)

    const handleHardwareImported = () => {
      importHardwareDialogVisible.value = false

      ElMessage({
        type: 'success',
        message: 'Import hardware successfully.'
      })

      loadTable()
    }

    const handleHardwareImportError = () => {
      ElMessage({
        type: 'error',
        message: 'Failed to import hardware.'
      })
    }

    return {
      loading,
      error,
      table,
      search,
      handlePageChange,
      handleHardwareUpdated,
      handleHardwareCreated,
      handleHardwareReturned,
      newHardwareDialogVisible,
      closeNewHardwareDialog,
      handleImportClick,
      handleExportClick,
      handleFilter,
      importHardwareDialogVisible,
      handleHardwareImported,
      handleHardwareImportError
    }
  }
})
</script>

<style scoped></style>
