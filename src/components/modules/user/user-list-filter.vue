<template>
  <div class="flex flex-nowrap items-center mb-4">
    <h1 class="flex-1">Filter</h1>
    <div v-if="!loading.all && !error.all">
      <base-button
        icon-class="fa-solid fa-filter"
        type="primary"
        :text="false"
        @click="handleFilter(formRef)"
      >
      </base-button>
      <base-button
        icon-class="fa-solid fa-arrows-rotate"
        type="info"
        :text="false"
        @click="resetFilter(formRef)"
      >
      </base-button>
    </div>
  </div>

  <!-- Filter skeleton -->
  <div v-if="loading.all">
    <el-skeleton
      :count="9"
      animated
    >
      <template #template>
        <el-skeleton-item
          variant="h3"
          style="width: 50%"
        ></el-skeleton-item>
        <el-skeleton-item
          variant="button"
          class="w-full mb-4"
        ></el-skeleton-item>
      </template>
    </el-skeleton>
  </div>
  <!-- Filter skeleton end -->

  <!-- Filter form -->
  <div v-else>
    <el-form
      v-if="!error.all"
      ref="formRef"
      :model="form.data"
      label-position="top"
    >
      <!-- Name -->
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input v-model="form.data.name" />
      </el-form-item>

      <!-- Email -->
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input v-model="form.data.email" />
      </el-form-item>

      <!-- Department -->
      <el-form-item
        label="Department"
        prop="department"
      >
        <el-input v-model="form.data.department" />
      </el-form-item>

      <!-- Job title -->
      <el-form-item
        label="Job Title"
        prop="job_title"
      >
        <el-input v-model="form.data.job_title" />
      </el-form-item>

      <!-- Company -->
      <el-form-item
        label="Company"
        prop="company"
      >
        <el-select
          v-model="form.data.company"
          placeholder="Select/Input a company"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="item in form.companyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- Desk -->
      <el-form-item
        label="Desk"
        prop="desk"
      >
        <el-input v-model="form.data.desk" />
      </el-form-item>

      <!-- Location -->
      <el-form-item
        label="Location"
        prop="location_id"
      >
        <el-select
          v-model="form.data.location_id"
          placeholder="Select a location"
          class="w-full"
        >
          <el-option
            label="Any"
            value=""
          />
          <el-option
            v-for="item in form.locationOptions"
            :key="item.id"
            :label="`${item.name} - ${item.country}`"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <!-- Type -->
      <el-form-item
        label="Type"
        prop="type"
      >
        <el-select
          v-model="form.data.type"
          placeholder="Select a type"
          class="w-full"
        >
          <el-option
            v-for="item in form.typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- State -->
      <el-form-item
        label="State"
        prop="state"
      >
        <el-select
          v-model="form.data.state"
          placeholder="Select a state"
          class="w-full"
        >
          <el-option
            v-for="item in form.stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- Permission level -->
      <el-form-item
        label="Permission Level"
        prop="permission_level"
      >
        <el-select
          v-model="form.data.permission_level"
          placeholder="Select a company permission level"
          class="w-full"
        >
          <el-option
            v-for="item in form.permissionLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <div v-show="error.all">Failed to load filter.</div>
  </div>
  <!-- Filter form end -->
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { UserFilter } from '@/types/store/user.module.type'
import useLocation from '@/hooks/useLocation'
import { Location } from '@/types/store/location.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { FormInstance } from 'element-plus/es'

export default defineComponent({
  name: 'user-list-filter',
  components: { BaseButton },
  props: {
    filter: {
      required: true,
      type: Object as PropType<UserFilter>
    }
  },
  emits: ['filter'],
  setup: (props, { emit }) => {
    const formRef = ref()

    const { loading, error, getAllLocations } = useLocation()

    const form = reactive({
      data: { ...props.filter } as UserFilter,
      companyOptions: [
        { label: 'Any', value: '' },
        { label: 'LifeByte', value: 'LifeByte' },
        { label: 'TMGM', value: 'TMGM' }
      ],
      locationOptions: [] as Location[],
      typeOptions: [
        { label: 'Any', value: '' },
        { label: 'Employee', value: 'Employee' },
        { label: 'Storage', value: 'Storage' },
        { label: 'Meeting Room', value: 'Meeting Room' },
        { label: 'Others', value: 'Others' }
      ],
      stateOptions: [
        { label: 'Any', value: '' },
        { label: 'Left', value: 0 },
        { label: 'On Job', value: 1 }
      ],
      permissionLevelOptions: [
        { label: 'Any', value: '' },
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ]
    })

    getAllLocations().then((locations) => {
      form.locationOptions = locations
    })

    const handleFilter = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid) {
          emit('filter', form.data)
        }
      })
    }

    const resetFilter = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return { formRef, form, loading, error, handleFilter, resetFilter }
  }
})
</script>

<style scoped></style>
