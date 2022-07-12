<template>
  <el-table
    :data="data"
    border
    flexible
    fit
    lazy
    class="overflow-auto w-auto max-h-full"
  >
    <el-table-column
      property="name"
      label="Name"
      min-width="250"
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
      property="serial_number"
      label="Serial Number"
      min-width="350"
    ></el-table-column>
    <el-table-column
      property="tag"
      label="Tag"
      min-width="200"
    ></el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="140"
    >
      <template #default="scope">
        <router-link :to="{ name: 'hardware.show', params: { id: scope.row.id } }">
          <el-tooltip
            content="View detail"
            placement="top"
            :show-after="500"
          >
            <base-button
              icon-class="fa-solid fa-eye"
              :text="false"
            >
            </base-button>
          </el-tooltip>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseButton from '@/components/base/base-button.vue'

export default defineComponent({
  name: 'user-hardware-table',
  components: { BaseButton },
  props: {
    data: {
      required: true,
      type: Array as PropType<Hardware[]>
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
