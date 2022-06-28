<template>
  <the-content-header>
    <h1>User Detail</h1>
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
          <div>
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

export default defineComponent({
  components: { BaseAvatar, TheContentHeader },
  name: 'user-show-view',
  props: {},
  setup() {
    const route = useRoute()
    const id = parseInt(route.params.id as string)

    const user = ref(null)
    const loading = ref(true)

    if (id)
      apis.user
        .getUser(id)
        .then((response) => {
          user.value = response.data
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })

    return { user, loading }
  }
})
</script>

<style scoped></style>
