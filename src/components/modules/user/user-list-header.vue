<template>
  <div class="flex flex-row flex-nowrap items-center">
    <h1>User List</h1>
    <div class="flex flex-1 justify-end">
      <el-button
        type="success"
        class="mr-4"
        @click="handleNewClick"
      >
        <base-icon-text
          icon-class="fa-solid fa-plus"
          text="New"
        ></base-icon-text>
      </el-button>

      <el-button-group>
        <el-button @click="handleImportClick">
          <base-icon-text
            icon-class="fa-solid fa-file-import"
            text="import"
          ></base-icon-text>
        </el-button>
        <el-button @click="handleExportClick">
          <base-icon-text
            icon-class="fa-solid fa-file-export"
            text="Export"
          ></base-icon-text>
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseIconText from '@/components/base/base-icon-text.vue'
import { useStore } from '@/store'
import { ModuleDrawerType } from '@/types/enums/components.enum'

export default defineComponent({
  name: 'user-list-header',
  components: { BaseIconText },
  props: {},
  setup: () => {
    const store = useStore()

    const handleNewClick = () => {
      store.commit('user/setDrawerUser', {})
      store.commit('user/setDrawerType', ModuleDrawerType.CREATE)
      store.commit('user/openDrawer')
    }

    const handleImportClick = () => {
      console.log('import user')
    }

    const handleExportClick = () => {
      console.log('export user')
    }

    return { handleNewClick, handleImportClick, handleExportClick }
  }
})
</script>

<style scoped></style>
