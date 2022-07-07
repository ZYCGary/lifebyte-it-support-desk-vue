<template>
  <the-main-content>
    <template #header>
      <user-show-header :user="user"></user-show-header>
    </template>

    <template #content>
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
              <user-profile v-model:user="user"></user-profile>
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
          >
            User not found
          </el-main>
        </template>
      </el-container>
    </template>
  </the-main-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import apis from '@/http/apis'
import UserShowHeader from '@/components/modules/user/user-show-header.vue'
import UserProfile from '@/components/modules/user/user-profile.vue'
import { useRoute } from 'vue-router'
import TheMainContent from '@/components/layouts/the-main-content.vue'

export default defineComponent({
  components: { TheMainContent, UserProfile, UserShowHeader },
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
