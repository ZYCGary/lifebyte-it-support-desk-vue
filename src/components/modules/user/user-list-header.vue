<template>
  <div class="flex flex-row flex-nowrap items-center">
    <h1>User List</h1>
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
    <user-profile-form
      type="create"
      :user="newUser"
      @success="handleUserAdded"
      @cancel="dialogVisible = false"
    ></user-profile-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseIconText from '@/components/base/base-icon-text.vue'
import { User } from '@/types/store/user.module.type'
import { ElMessageBox } from 'element-plus/es'
import UserProfileForm from '@/components/modules/user/user-profile-form.vue'
import { useRouter } from 'vue-router'
import apis from '@/http/apis'

export default defineComponent({
  name: 'user-list-header',
  components: { UserProfileForm, BaseIconText },
  props: {},
  setup: () => {
    const newUser: User = {
      id: -1,
      name: '',
      email: '',
      department: '',
      job_title: '',
      location: {
        id: 1,
        name: '55C',
        country: 'Australia'
      },
      desk: '',
      company: 'LifeByte',
      type: 'Employee',
      state: 1,
      permission_level: 0
    }

    const dialogVisible = ref(false)

    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('User is not saved, are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch()
    }

    const router = useRouter()

    const handleUserAdded = (user: User) => {
      router.push({ name: 'user.show', params: { id: user.id } })
    }

    const handleImportClick = () => {
      console.log('import user')
    }

    const handleExportClick = () => {
      apis.user
        .exportUsers()
        .then((file) => {
          const url = window.URL.createObjectURL(new Blob([file]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'users.xlsx')
          document.body.appendChild(link)
          link.click()
        })
        .catch()
    }

    return { newUser, dialogVisible, handleClose, handleUserAdded, handleImportClick, handleExportClick }
  }
})
</script>

<style scoped></style>
