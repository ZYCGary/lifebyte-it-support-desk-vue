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
      property="type"
      label="Type"
      width="150"
    ></el-table-column>
    <el-table-column
      property="brand"
      label="Brand"
      width="200"
    ></el-table-column>
    <el-table-column
      property="user.location.name"
      label="Location"
      width="200"
    ></el-table-column>
    <el-table-column
      property="serial_number"
      label="Serial Number"
      width="300"
    ></el-table-column>
    <el-table-column
      property="tag"
      label="Tag"
      width="200"
    ></el-table-column>
    <el-table-column
      label="User"
      width="250"
    >
      <template #default="scope">
        <el-popover
          v-if="scope.row.user.type !== 'Storage'"
          trigger="hover"
          placement="top"
          width="auto"
        >
          <template #default>
            <div>{{ scope.row.user.email }}</div>
          </template>
          <template #reference>
            <router-link
              :to="{ name: 'user.show', params: { id: scope.row.user.id } }"
              class="hover:text-blue-500"
            >
              {{ scope.row.user.name }}
            </router-link>
          </template>
        </el-popover>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Availability"
      width="120"
    >
      <template #default="scope">
        <el-tag
          effect="dark"
          :type="scope.row.user.type === 'Storage' ? 'success' : 'info'"
        >
          {{ scope.row.user.type === 'Storage' ? 'In Stock' : 'In Use' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120"
    >
      <template #default="scope">
        <router-link :to="{ name: 'hardware.show', params: { id: scope.row.id, type: 'update' } }">
          <el-tooltip
            content="View detail"
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
import { defineComponent, PropType } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'hardware-table',
  components: { BaseButton },
  props: {
    data: {
      required: true,
      type: Array as PropType<Hardware[]>
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

    const handleRowClick = (row: Hardware) => {
      router.push({ name: 'hardware.show', params: { id: row.id } })
    }

    return { handleRowClick }
  }
})
</script>

<style scoped></style>
