<template>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <el-card
      header="Total"
      shadow="hover"
    >
      123
    </el-card>
    <el-card
      header="Departments"
      shadow="hover"
    >
      15
    </el-card>
  </div>
  <div class="grid gap-4">
    <el-card
      header="Users By Department"
      shadow="hover"
    >
      123
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'user-dashboard',
  setup: () => {}
})
</script>

<style scoped></style>
