<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>User List</h1>
        <div class="flex flex-1 justify-end">
          <el-button
            type="success"
            class="mr-4"
            @click="newUserDialogVisible = true"
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
          <div class="">
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
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <user-profile-create-form
      @cancel="newUserDialogVisible = false"
      @created="handleUserCreated"
    ></user-profile-create-form>
  </el-dialog>
  <!-- New user dialog end -->
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
import BaseIconText from '@/components/base/base-icon-text.vue'
import UserProfileCreateForm from '@/components/modules/user/user-profile-create-form.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    UserProfileCreateForm,
    BaseIconText,
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

    const handleUserUpdated = () => {
      loadTable(table.filter)
    }

    const newUserDialogVisible = ref<boolean>(false)

    const router = useRouter()

    const handleUserCreated = (userId: number) => {
      router.push({ name: 'user.show', params: { id: userId } })
    }

    const handleImportClick = () => {
      // TODO: user import
      console.log('import')
    }

    const handleExportClick = () => {
      // TODO: user export
      console.log('export')
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
      handleImportClick,
      handleExportClick
    }
  }
})
</script>

<style scoped></style>
