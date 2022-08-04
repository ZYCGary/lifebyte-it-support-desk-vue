<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>User List</h1>
        <div class="flex flex-1 justify-end">
          <base-button
            type="success"
            icon-class="fa-solid fa-plus"
            class="mr-4"
            @click="newUserDialogVisible = true"
          >
            New
          </base-button>

          <el-button-group>
            <base-button
              icon-class="fa-solid fa-file-import"
              @click="importUserDialogVisible = true"
            >
              Import
            </base-button>
            <base-button
              icon-class="fa-solid fa-file-export"
              @click="handleExportClick"
              :loading="loading.export"
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

            <user-table
              :data="table.data"
              :loading="loading.collection"
              :error="error.collection"
              @user-updated="handleUserUpdated"
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

  <!-- New user dialog -->
  <el-dialog
    v-model="newUserDialogVisible"
    title="New User"
    :destroy-on-close="true"
    :before-close="closeNewUserDialog"
  >
    <user-profile-form-create
      @cancel="closeNewUserDialog"
      @created="handleUserCreated"
    ></user-profile-form-create>
  </el-dialog>
  <!-- New user dialog end -->

  <!-- Import user dialog -->
  <el-dialog
    v-model="importUserDialogVisible"
    title="Import User"
    :destroy-on-close="true"
  >
    <base-upload
      url="/api/v1/users/import"
      @success="handleUserImported"
      @error="handleUserImportError"
    ></base-upload>
  </el-dialog>
  <!-- Import user dialog end -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import TheRightAside from '@/components/layouts/the-right-aside.vue'
import UserTable from '@/components/modules/user/user-table.vue'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import { BasePaginationProps } from '@/types/components.type'
import BaseSearchBar from '@/components/base/base-search-bar.vue'
import BasePagination from '@/components/base/base-pagination.vue'
import { User, UserFilter } from '@/types/store/user.module.type'
import UserListFilter from '@/components/modules/user/user-list-filter.vue'
import useUser from '@/hooks/useUser'
import UserProfileFormCreate from '@/components/modules/user/user-profile-form-create.vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import BaseButton from '@/components/base/base-button.vue'
import BaseUpload from '@/components/base/base-upload.vue'

export default defineComponent({
  components: {
    BaseUpload,
    BaseButton,
    UserProfileFormCreate,
    UserListFilter,
    BasePagination,
    BaseSearchBar,
    TheMainContent,
    UserTable,
    TheRightAside
  },
  name: 'user-index-view',
  props: {},
  setup() {
    const { loading, error, getUserCollection, exportUsers } = useUser()

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

    const handleUserUpdated = () => {
      loadTable(table.filter)
    }

    const newUserDialogVisible = ref<boolean>(false)

    const closeNewUserDialog = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          newUserDialogVisible.value = false
        })
        .catch(() => {})
    }

    const router = useRouter()

    const handleUserCreated = (userId: number) => {
      router.push({ name: 'user.show', params: { id: userId } })
    }

    const handleImportClick = () => {
      // TODO: user import
      console.log('import')
    }

    const handleExportClick = () => {
      exportUsers()
        .then()
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to export users.'
          })
        })
    }

    const importUserDialogVisible = ref<boolean>(false)

    const handleUserImported = () => {
      importUserDialogVisible.value = false

      ElMessage({
        type: 'success',
        message: 'Import users successfully.'
      })

      loadTable()
    }

    const handleUserImportError = () => {
      ElMessage({
        type: 'error',
        message: 'Failed to import users.'
      })
    }

    return {
      loading,
      error,
      table,
      search,
      handlePageChange,
      handleFilter,
      handleUserUpdated,
      handleUserCreated,
      newUserDialogVisible,
      closeNewUserDialog,
      handleImportClick,
      handleExportClick,
      importUserDialogVisible,
      handleUserImported,
      handleUserImportError
    }
  }
})
</script>

<style scoped></style>
