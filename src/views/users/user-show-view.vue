<template>
  <the-main-content>
    <template #header>
      <user-show-header :user="user"></user-show-header>
    </template>

    <template #content>
      <el-container class="h-full">
        <template v-if="loading || user">
          <el-aside
            width="30%"
            class="h-full border-r"
          >
            <el-main>
              <!-- User profile -->
              <template v-if="user">
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
                  <el-descriptions-item
                    label="Type"
                    label-class-name="w-40"
                  >
                    {{ user.type }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Department">
                    {{ user.department }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Job Title">
                    {{ user.job_title }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Desk">
                    {{ user.desk }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Location">
                    {{ user.location.name }} - {{ user.location.country }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Company">
                    {{ user.company }}
                  </el-descriptions-item>
                  <el-descriptions-item label="State">
                    {{ user.state === 1 ? 'On Job' : 'Left' }}
                  </el-descriptions-item>
                  <el-descriptions-item label="Permission Level">
                    {{ user.permission_level }}
                  </el-descriptions-item>
                </el-descriptions>

                <div class="flex flex-row flex-nowrap justify-end mt-4">
                  <router-link :to="{ name: 'user.edit', params: { id: user.id } }">
                    <base-button
                      icon-class="fa-solid fa-pen-to-square"
                      type="primary"
                    >
                      Edit
                    </base-button>
                  </router-link>
                </div>
              </template>
              <!-- User profile end -->

              <!-- User profile skeleton -->
              <template v-else>
                <el-skeleton
                  animated
                  style="--el-skeleton-circle-size: 2.25rem"
                >
                  <template #template>
                    <el-skeleton-item
                      variant="circle"
                      style="width: 36px"
                    ></el-skeleton-item>
                  </template>
                </el-skeleton>
                <el-skeleton :rows="7"></el-skeleton>
              </template>
              <!-- User profile skeleton end -->
            </el-main>
          </el-aside>
          <el-container class="h-full overflow-y-auto">
            <el-main> Assets </el-main>
          </el-container>
        </template>

        <template v-if="!loading && !user">
          <el-main class="text-center"> User not found </el-main>
        </template>
      </el-container>
    </template>
  </the-main-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import apis from '@/http/apis'
import UserShowHeader from '@/components/modules/user/user-show-header.vue'
import { useRoute } from 'vue-router'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import BaseAvatar from '@/components/base/base-avatar.vue'
import BaseButton from '@/components/base/base-button.vue'

export default defineComponent({
  components: { BaseButton, BaseAvatar, TheMainContent, UserShowHeader },
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

    return { user, loading }
  }
})
</script>

<style scoped></style>
