<template>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <el-card
      header="Total"
      shadow="hover"
    >
      2000
    </el-card>
    <el-card
      header="Types"
      shadow="hover"
    >
      10
    </el-card>
  </div>
  <div class="grid gap-4">
    <el-card
      header="Hardware By Type & Department"
      shadow="hover"
    >
      123
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'hardware-dashboard',
  setup: () => {}
})
</script>

<style scoped></style>
