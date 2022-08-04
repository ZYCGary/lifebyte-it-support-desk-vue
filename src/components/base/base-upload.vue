<template>
  <el-upload
    :action="action"
    :headers="headers"
    drag
    with-credentials
    :on-success="handleSuccess"
    :on-error="handleError"
  >
    <div class="text-4xl"><i class="fa-solid fa-cloud-arrow-up"></i></div>
    <div>Drop file here or <em class="text-blue-600">click to upload</em></div>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import http from '@/http'
import { useCookies } from 'vue3-cookies'

export default defineComponent({
  name: 'base-upload',
  props: {
    url: {
      required: true,
      type: String
    }
  },
  emits: ['success', 'error'],
  setup: (props, { emit }) => {
    const action = http.defaults.baseURL + props.url

    const { cookies } = useCookies()

    const headers = reactive({
      'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
    })

    const handleSuccess = (response: any) => {
      emit('success', response)
    }

    const handleError = (error: Error) => {
      emit('error', error)
    }

    return { action, headers, handleSuccess, handleError }
  }
})
</script>

<style scoped></style>
