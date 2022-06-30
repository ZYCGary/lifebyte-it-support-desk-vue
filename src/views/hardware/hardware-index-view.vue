<template>
  <the-content-header>
    <hardware-list-header></hardware-list-header>
  </the-content-header>
  <el-container class="relative">
    <el-container class="h-full overflow-y-auto">
      <el-main>
        <div class="relative flex flex-row flex-wrap">
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
import { Hardware } from '@/types/store/hardware.module.type'
import HardwareTable from '@/components/modules/hardware/hardware-table.vue'
import { BasePaginationProps } from '@/types/components.type'
import apis from '@/http/apis'

export default defineComponent({
  components: { HardwareTable, HardwareListHeader, TheContentHeader, TheRightAside },
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
      filter: reactive({
        name: null,
        type: null,
        brand: null,
        serial_number: null,
        tag: null,
        spec_os: null,
        spec_cpu: null,
        spec_memory: null,
        spec_screen_size: null,
        spec_ports: [],
        spec_adapter_input: null,
        spec_adapter_output: [],
        spec_cable_length: null
      })
    })

    const loadTable = () => {
      table.loading = true
      table.error = false
      table.data = []

      apis.hardware
        .getHardwareCollection()
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

    loadTable()

    return { table }
  }
})
</script>

<style scoped></style>
