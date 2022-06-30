<template>
  <div class="flex flex-row flex-nowrap items-center">
    <h1>Hardware List</h1>
    <div class="flex flex-1 justify-end">
      <el-button
        type="success"
        class="mr-4"
        @click="dialogVisible = true"
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

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <template #header>
      <h1>New User</h1>
    </template>
    <div
      type="create"
      :hardware="newHardware"
      @success="handleHardwareAdded"
      @cancel="dialogVisible = false"
    >
      123
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseIconText from '@/components/base/base-icon-text.vue'
import { User } from '@/types/store/user.module.type'
import { ElMessageBox } from 'element-plus/es'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'hardware-list-header',
  components: { BaseIconText },
  props: {},
  setup: () => {
    const newHardware = {}

    const dialogVisible = ref(false)

    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('Hardware is not saved, are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch()
    }

    const router = useRouter()

    const handleHardwareAdded = (user: User) => {
      router.push({ name: 'user.show', params: { id: user.id } })
    }

    const handleImportClick = () => {
      console.log('import user')
    }

    const handleExportClick = () => {
      console.log('export user')
    }

    return { newHardware, dialogVisible, handleClose, handleHardwareAdded, handleImportClick, handleExportClick }
  }
})
</script>

<style scoped></style>
