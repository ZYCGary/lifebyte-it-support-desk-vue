<template>
  <el-input
    v-model="searchValue"
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
    }
  },
  emits: ['search'],
  setup: (props, { emit }) => {
    const searchValue = ref('')

    const search = () => {
      emit('search', searchValue.value)
    }
    return { searchValue, search }
  }
})
</script>

<style scoped></style>
