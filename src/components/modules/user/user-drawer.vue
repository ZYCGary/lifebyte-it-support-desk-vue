<template>
  <div>
    <el-drawer
      v-model="drawer.show"
      @closed="handleClosed"
      destroy-on-close
      :size="800"
    >
      <template
        #header
        v-if="!drawer.editable"
      >
        <h1 class="font-bold text-2xl text-black">{{ user.name }}</h1>
      </template>

      <user-drawer-profile
        v-model:editable="drawer.editable"
        :user="user"
      ></user-drawer-profile>

      <div v-if="drawer.editable">
        <el-form> </el-form>
      </div>

      <el-divider></el-divider>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watchEffect } from 'vue'
import { User } from '@/types/store/user.module.type'
import UserDrawerProfile from '@/components/modules/user/user-drawer-profile.vue'

export default defineComponent({
  name: 'user-drawer',
  components: { UserDrawerProfile },
  props: {
    show: {
      required: true,
      type: Boolean,
      default: false
    },
    user: {
      required: true,
      type: Object as PropType<User>
    }
  },
  emits: ['update:show', 'update:user'],
  setup: (props, { emit }) => {
    const drawer = reactive({
      show: props.show,
      user: props.user,
      editable: false
    })

    watchEffect(() => {
      drawer.show = props.show
      drawer.user = props.user
    })

    const handleClosed = () => {
      drawer.editable = false
      emit('update:show', false)
      emit('update:user', {})
    }

    return { drawer, handleClosed }
  }
})
</script>

<style scoped></style>
