<template>
  <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
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
      type: Number,
      default: 0
    },
    pageSize: {
      required: true,
      type: Number,
      default: 15
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
