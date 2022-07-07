<template>
  <h1>Filter</h1>
  <div>
    {{ form }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { UserFilter } from '@/types/store/user.module.type'

export default defineComponent({
  name: 'user-list-filter',
  props: {
    filter: {
      required: true,
      type: Object as PropType<UserFilter>
    }
  },
  emits: ['update:filter'],
  setup(props) {
    const formRef = ref()
    const form = reactive({
      data: { ...props.filter } as UserFilter,
      companyOptions: [
        { label: 'LifeByte', value: 'LifeByte' },
        { label: 'TMGM', value: 'TMGM' }
      ],
      locationOptions: [] as Location[],
      typeOptions: [
        { label: 'All', value: null },
        { label: 'Employee', value: 'Employee' },
        { label: 'Storage', value: 'Storage' },
        { label: 'Meeting Room', value: 'Meeting Room' },
        { label: 'Others', value: 'Others' }
      ],
      stateOptions: [
        { label: 'All', value: null },
        { label: 'Left', value: 0 },
        { label: 'On Job', value: 1 }
      ],
      permissionLevelOptions: [
        { label: 'All', value: null },
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ]
    })

    return { formRef, form }
  }
})
</script>

<style scoped></style>
