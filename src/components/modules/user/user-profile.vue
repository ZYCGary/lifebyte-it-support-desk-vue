<template>
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
      type="update"
      :user="user"
      @success="handleProfileUpdated"
      @cancel="editable = false"
    ></user-profile-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import UserProfileForm from '@/components/modules/user/user-profile-form.vue'
import BaseButton from '@/components/base/base-button.vue'
import BaseAvatar from '@/components/base/base-avatar.vue'
import { User } from '@/types/store/user.module.type'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'user-profile',
  components: { BaseAvatar, BaseButton, UserProfileForm },
  props: {
    user: {
      required: true,
      type: Object as PropType<User>
    }
  },
  emits: ['update:user'],
  setup(props, { emit }) {
    const editable = ref(false)

    const route = useRoute()

    if (route.params?.type === 'update') editable.value = true

    const handleProfileUpdated = (profile: object) => {
      emit('update:user', { ...props.user, ...profile })
      editable.value = false
    }

    return { editable, handleProfileUpdated }
  }
})
</script>

<style scoped></style>
