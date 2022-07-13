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
      property="user"
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
      property="operations"
      width="120"
    >
      <template #default="scope">
        <div class="flex flex-row flex-nowrap gap-x-2">
          <el-tooltip
            content="Edit"
            placement="top"
            :show-after="500"
          >
            <base-button
              icon-class="fa-solid fa-pen-to-square"
              type="primary"
              :text="false"
              @click="showUpdateDialog(scope.row.id)"
            >
            </base-button>
          </el-tooltip>
        </div>
      </template>
    </el-table-column>

    <template #empty>
      {{ loading ? 'Loading data...' : error ? 'Failed to load data' : 'No data' }}
    </template>
  </el-table>

  <!-- Hardware update dialog -->
  <el-dialog
    v-model="updateHardwareDialogVisible"
    title="Update Hardware"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <hardware-form-update
      :hardware-id="clickedHardwareId"
      @cancel="updateHardwareDialogVisible = false"
      @updated="handleHardwareUpdated"
    ></hardware-form-update>
  </el-dialog>
  <!-- Hardware update dialog end -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { useRouter } from 'vue-router'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import HardwareFormUpdate from '@/components/modules/hardware/hardware-form-update.vue'

export default defineComponent({
  name: 'hardware-table',
  components: { HardwareFormUpdate, BaseButton },
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
  emits: ['hardwareUpdated'],
  setup: (props, { emit }) => {
    const updateHardwareDialogVisible = ref<boolean>(false)
    const clickedHardwareId = ref<number>(0)
    const router = useRouter()

    const handleRowClick = (row: Hardware, column: TableColumnCtx<Hardware>) => {
      if (column.property !== 'operations' && column.property !== 'user') {
        router.push({ name: 'hardware.show', params: { id: row.id } })
      }
    }

    const showUpdateDialog = (hardwareId: number) => {
      clickedHardwareId.value = hardwareId
      updateHardwareDialogVisible.value = true
    }

    const handleHardwareUpdated = () => {
      updateHardwareDialogVisible.value = false
      emit('hardwareUpdated')
    }

    return { updateHardwareDialogVisible, clickedHardwareId, handleRowClick, showUpdateDialog, handleHardwareUpdated }
  }
})
</script>

<style scoped></style>
