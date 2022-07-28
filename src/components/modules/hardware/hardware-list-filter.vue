<template>
  <div class="flex flex-nowrap items-center mb-4">
    <h1 class="flex-1">Filter</h1>
    <div>
      <el-button-group>
        <el-tooltip
          content="Apply Filter"
          placement="bottom"
          :show-after="500"
        >
          <base-button
            icon-class="fa-solid fa-filter"
            :text="false"
            @click="handleFilter(formRef)"
          >
          </base-button>
        </el-tooltip>
        <el-tooltip
          content="Reset Filter"
          placement="bottom"
          :show-after="500"
        >
          <base-button
            icon-class="fa-solid fa-arrows-rotate"
            :text="false"
            @click="resetFilter(formRef)"
          >
          </base-button>
        </el-tooltip>
      </el-button-group>
    </div>
  </div>

  <!-- Filter form -->
  <div>
    <el-form
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

      <!-- Type -->
      <el-form-item
        label="Type"
        prop="type"
      >
        <el-select
          v-model="form.data.type"
          placeholder="Select a type"
          class="w-full"
          default-first-option
        >
          <el-option
            label="Any"
            value=""
          />
          <el-option
            v-for="(item, index) in form.type_options"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- Brand -->
      <el-form-item
        label="Brand"
        prop="brand"
      >
        <el-input v-model="form.data.brand" />
      </el-form-item>

      <!-- Model -->
      <el-form-item
        label="Model"
        prop="model"
      >
        <el-input v-model="form.data.model" />
      </el-form-item>

      <!-- Serial number -->
      <el-form-item
        label="Serial Number"
        prop="serial_number"
      >
        <el-input v-model="form.data.serial_number" />
      </el-form-item>

      <!-- Tag -->
      <el-form-item
        label="Tag"
        prop="tag"
      >
        <el-input v-model="form.data.tag" />
      </el-form-item>

      <!-- Specification: operating system -->
      <el-form-item
        label="Operating System"
        prop="spec_os"
      >
        <el-select
          v-model="form.data.spec_os"
          placeholder="Select/Input an operating system"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            label="Any"
            value=""
          />
          <el-option
            v-for="(item, index) in form.os_options"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- Specification: CPU -->
      <el-form-item
        label="CPU"
        prop="spec_cpu"
      >
        <el-select
          v-model="form.data.spec_cpu"
          placeholder="Select/Input a CPU"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            label="Any"
            value=""
          />
          <el-option
            v-for="(item, index) in form.cpu_options"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- Specification: memory -->
      <el-form-item
        label="Memory (GB)"
        prop="spec_memory"
      >
        <el-input-number
          v-model="form.data.spec_memory"
          :min="0"
          class="w-full"
        />
      </el-form-item>

      <!-- Specification: storage -->
      <el-form-item
        label="Storage (GB)"
        prop="spec_storage"
      >
        <el-input-number
          v-model="form.data.spec_storage"
          :min="0"
          class="w-full"
        />
      </el-form-item>

      <!-- Specification: screen size -->
      <el-form-item
        label="Screen Size (inch)"
        prop="spec_screen_size"
      >
        <el-input-number
          v-model="form.data.spec_screen_size"
          :min="0"
          :step="0.5"
          class="w-full"
        />
      </el-form-item>
    </el-form>
  </div>
  <!-- Filter form end -->
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { HardwareFilter } from '@/types/store/hardware.module.type'
import { FormInstance } from 'element-plus/es'
import BaseButton from '@/components/base/base-button.vue'

export default defineComponent({
  name: 'hardware-list-filter',
  components: { BaseButton },
  props: {
    filter: {
      required: true,
      type: Object as PropType<HardwareFilter>
    }
  },
  emits: ['filter'],
  setup: (props, { emit }) => {
    const formRef = ref()

    const form = reactive({
      data: { ...props.filter } as HardwareFilter,
      type_options: [
        'Desktop',
        'Laptop',
        'Mouse',
        'Keyboard',
        'Adapter',
        'Docking Station',
        'TV',
        'Monitor',
        'Phone',
        'Others'
      ],
      os_options: ['Windows', 'mac OS', 'Linux'],
      cpu_options: [
        'Apple M1',
        'Apple M1 Pro',
        'Apple M1 Max',
        'Apple M1 Ultra',
        'Apple M2',
        'Intel Core i9',
        'Intel Core i7',
        'Intel Core i5'
      ]
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

    return { formRef, form, handleFilter, resetFilter }
  }
})
</script>

<style scoped></style>
