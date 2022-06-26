<template>
  <div>
    <el-drawer
      v-model="drawer.open"
      @closed="handleClosed"
      destroy-on-close
      :size="800"
      :key="key"
    >
      <template
        #header
        v-if="drawer.type === 'show'"
      >
        <h1 class="font-bold text-2xl text-black">{{ drawer.user?.name }}</h1>
      </template>

      <user-drawer-profile
        v-model:type="drawer.type"
        :user="drawer.user"
      ></user-drawer-profile>

      <div v-if="drawer.type !== 'show'">
        <el-form> </el-form>
      </div>

      <el-divider></el-divider>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import UserDrawerProfile from '@/components/modules/user/user-drawer-profile.vue'

export default defineComponent({
  name: 'user-drawer',
  components: { UserDrawerProfile },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const drawer = reactive({
      user: props.modelValue.user,
      open: props.modelValue.open,
      type: props.modelValue.type
    })

    // Key used to force update drawer.
    const key = ref(0)

    watchEffect(() => {
      key.value += 1
      drawer.open = props.modelValue.open
      drawer.user = props.modelValue.user
      drawer.type = props.modelValue.type
    })

    const handleClosed = () => {
      drawer.open = false
      drawer.user = null
      emit('update:modelValue', drawer)
    }

    return { drawer, handleClosed, key }
  }
})
</script>

<style scoped></style>
