<template>
  <el-input
    v-model="searchKey"
    :placeholder="placeholder"
    @change="search"
  >
    <template #prefix>
      <i class="fa-solid fa-magnifying-glass"></i>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'base-search-bar',
  props: {
    placeholder: {
      required: false,
      type: String,
      default: 'Type to search'
    },
    searchValue: {
      required: true,
      type: String,
      default: ''
    }
  },
  emits: ['update:searchValue', 'search'],
  setup: (props, { emit }) => {
    const searchKey = ref('')

    const search = () => {
      emit('update:searchValue', searchKey.value)
      emit('search', searchKey.value)
    }
    return { searchKey, search }
  }
})
</script>

<style scoped></style>
