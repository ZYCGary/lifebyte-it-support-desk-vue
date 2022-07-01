<template>
  <the-content-header>
    <hardware-show-header
      v-if="hardware"
      :hardware="hardware"
    ></hardware-show-header>
  </the-content-header>
  <el-container
    v-loading="loading"
    class="relative"
  >
    <template v-if="!error && hardware">
      <el-main>
        <hardware-information v-model:hardware="hardware"></hardware-information>
      </el-main>
    </template>

    <template v-else>
      <el-main
        v-if="!loading"
        class="text-center"
      >
        {{ error }}
      </el-main>
    </template>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HardwareShowHeader from '@/components/modules/hardware/hardware-show-header.vue'
import TheContentHeader from '@/components/layouts/the-content-header.vue'
import { useRoute } from 'vue-router'
import apis from '@/http/apis'
import { ElMessage } from 'element-plus/es'
import HardwareInformation from '@/components/modules/hardware/hardware-information.vue'

export default defineComponent({
  name: 'hardware-show-view',
  components: { HardwareInformation, TheContentHeader, HardwareShowHeader },
  props: {},
  setup: () => {
    const route = useRoute()

    const id = parseInt(route.params.id as string)
    const hardware = ref(null)
    const loading = ref<boolean>(true)
    const error = ref<boolean | string>(false)

    if (id) {
      apis.hardware
        .getHardware(id)
        .then((response) => {
          hardware.value = response.data
          loading.value = false
          error.value = false
        })
        .catch((err) => {
          loading.value = false

          if (err.response.status === 404) {
            error.value = 'Hardware not found'
          } else {
            error.value = 'Failed to load hardware detail'
            ElMessage({
              type: 'error',
              message: 'Failed to load hardware detail, please try again later.'
            })
          }
        })
    }
    return { hardware, loading, error }
  }
})
</script>

<style scoped></style>
