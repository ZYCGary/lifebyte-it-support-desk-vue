<template>
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="handleCurrentChange"
  />
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
