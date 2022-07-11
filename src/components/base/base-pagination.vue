<template>
  <el-pagination
    layout="slot, prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="handleCurrentChange"
  >
    <span class="mx-4">Showing {{ from }} to {{ to }} of {{ total }} entities</span>
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    pageSize: {
      required: true,
      type: Number
    },
    currentPage: {
      required: true,
      type: Number
    },
    from: {
      required: true,
      type: Number
    },
    to: {
      required: true,
      type: Number
    }
  },
  emits: ['currentChange'],
  setup: (props, { emit }) => {
    const handleCurrentChange = (page: number) => {
      emit('currentChange', page)
    }
    return { handleCurrentChange }
  }
})
</script>

<style scoped></style>
