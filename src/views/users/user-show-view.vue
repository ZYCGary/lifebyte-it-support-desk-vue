<template>
  <the-content-header>
    <user-show-header></user-show-header>
  </the-content-header>
  <el-container
    v-loading="loading"
    class="relative"
  >
    <template v-if="user">
      <el-aside
        width="40%"
        class="border-r"
      >
        <el-main>
          <!-- Profile description -->
          <div v-if="!editable">
            <base-avatar
              :name="user.name"
              class="mb-4"
            ></base-avatar>
            <h1 class="mb-2 font-bold text-2xl">{{ user.name }}</h1>
            <el-descriptions
              border
              :title="user.email"
              :column="1"
            >
              <el-descriptions-item label="Department">
                {{ user.department }}
              </el-descriptions-item>
              <el-descriptions-item label="Job Title">
                {{ user.job_title }}
              </el-descriptions-item>
              <el-descriptions-item label="Office">
                {{ user.location_office }}
              </el-descriptions-item>
              <el-descriptions-item label="Position">
                {{ user.location_position }}
              </el-descriptions-item>
              <el-descriptions-item label="State">
                {{ user.state === 1 ? 'On Job' : 'Left' }}
              </el-descriptions-item>
              <el-descriptions-item label="Is Admin">
                {{ user.is_admin ? 'True' : 'False' }}
              </el-descriptions-item>
            </el-descriptions>

            <div class="flex flex-row flex-nowrap justify-end mt-4">
              <base-button
                icon-class="fa-solid fa-pen-to-square"
                type="primary"
                @click="editable = true"
              >
                Update
              </base-button>
            </div>
          </div>

          <!-- Profile editable form -->
          <div v-else>
            <user-profile-form
              :user="user"
              @cancel="editable = false"
            ></user-profile-form>
          </div>
        </el-main>
      </el-aside>
      <el-container class="h-full overflow-y-auto">
        <el-main> Assets </el-main>
      </el-container>
    </template>

    <template v-else>
      <el-main
        v-if="!loading"
        class="text-center"
        >User not found</el-main
      >
    </template>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'
import BaseAvatar from '@/components/base/base-avatar.vue'
import { useRoute } from 'vue-router'
import apis from '@/http/apis'
import BaseButton from '@/components/base/base-button.vue'
import UserShowHeader from '@/components/modules/user/user-show-header.vue'
import UserProfileForm from '@/components/modules/user/user-profile-form.vue'

export default defineComponent({
  components: { UserProfileForm, UserShowHeader, BaseButton, BaseAvatar, TheContentHeader },
  name: 'user-show-view',
  props: {},
  setup() {
    const route = useRoute()
    const id = parseInt(route.params.id as string)
    const user = ref(null)
    const loading = ref(true)

    if (id) {
      apis.user
        .getUser(id)
        .then((response) => {
          user.value = response.data
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    }

    const editable = ref(false)

    return { user, loading, editable }
  }
})
</script>

<style scoped></style>
