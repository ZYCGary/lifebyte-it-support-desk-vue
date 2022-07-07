<template>
  <el-table
    :data="data"
    border
    flexible
    fit
    lazy
    class="overflow-auto w-auto max-h-full"
    row-class-name="cursor-pointer"
    @row-click="handleRowClick"
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
      label="Job Title"
      width="250"
    ></el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120"
    >
      <template #default="scope">
        <router-link :to="{ name: 'user.show', params: { id: scope.row.id, type: 'update' } }">
          <el-tooltip
            content="Update Profile"
            placement="top"
            :show-after="500"
          >
            <base-button
              icon-class="fa-solid fa-pen-to-square"
              type="primary"
              :text="false"
            >
            </base-button>
          </el-tooltip>
        </router-link>
      </template>
    </el-table-column>

    <template #empty>
      {{ loading ? 'Loading data...' : error ? 'Failed to load data' : 'No data' }}
    </template>
  </el-table>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BaseButton from '@/components/base/base-button.vue'
import { User } from '@/types/store/user.module.type'
import { useRouter } from 'vue-router'

export default {
  name: 'user-table',
  components: { BaseButton },
  props: {
    data: {
      required: true,
      type: Array as PropType<User[]>
    },
    loading: {
      required: true,
      type: Boolean
    },
    error: {
      required: true,
      type: Boolean
    }
  },
  setup: () => {
    const router = useRouter()

    const handleRowClick = (row: User) => {
      router.push({ name: 'user.show', params: { id: row.id } })
    }

    return { handleRowClick }
  }
}
</script>

<style scoped></style>
