<template>
  <!-- Information -->
  <el-descriptions
    :column="2"
    border
    class="mb-8"
  >
    <template #title>
      <h1 class="font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-circle-info"
          text="Information"
        ></base-icon-text>
      </h1>
    </template>

    <el-descriptions-item
      label="Name"
      span="2"
    >
      {{ hardware.name }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Description"
      span="2"
    >
      {{ hardware.description || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Type"
      width="25%"
    >
      {{ hardware.type }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Brand"
      width="25%"
    >
      {{ hardware.brand }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Model"
      width="25%"
    >
      {{ hardware.model }}
    </el-descriptions-item>
    <el-descriptions-item label="User">
      <el-popover
        v-if="hardware.user.type !== 'Storage'"
        trigger="hover"
        placement="top"
        width="auto"
      >
        <template #default>
          <div>{{ hardware.user.email }}</div>
        </template>
        <template #reference>
          <router-link
            :to="{ name: 'user.show', params: { id: hardware.user.id } }"
            class="hover:text-blue-500"
          >
            {{ hardware.user.name }}
          </router-link>
        </template>
      </el-popover>
      <span v-else> - </span>
    </el-descriptions-item>
    <el-descriptions-item label="Location"
      >{{ hardware.user.location.name }} - {{ hardware.user.location.country }}</el-descriptions-item
    >
    <el-descriptions-item
      label="Availability"
      width="25%"
    >
      <el-tag
        effect="dark"
        :type="hardware.user.type === 'Storage' ? 'success' : 'info'"
      >
        {{ hardware.user.type === 'Storage' ? 'In Stock' : 'In Use' }}
      </el-tag>
    </el-descriptions-item>
  </el-descriptions>

  <!-- Specifications -->
  <el-descriptions
    :column="2"
    border
    class="mb-6"
  >
    <template #title>
      <h1 class="font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-gear"
          text="Specifications"
        ></base-icon-text>
      </h1>
    </template>

    <el-descriptions-item
      v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
      label="Operation System"
      width="25%"
    >
      {{ hardware.spec_os || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
      label="CPU"
      width="25%"
    >
      {{ hardware.spec_cpu || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
      label="Memory (GB)"
      width="25%"
    >
      {{ hardware.spec_memory || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
      label="Storage (GB)"
      width="25%"
    >
      {{ hardware.spec_storage || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      v-if="['Desktop', 'Laptop', 'TV', 'Others'].includes(hardware.type)"
      label="Screen Size (inch)"
      width="25%"
    >
      {{ hardware.spec_screen_size || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Others"
      :span="2"
    >
      {{ hardware.spec_others || '-' }}
    </el-descriptions-item>
    <el-descriptions-item
      label="Bundle With"
      :span="2"
    >
      <template #default>
        <template v-if="hardware.bundle_with.length">
          <div class="flex flex-row flex-wrap gap-1">
            <el-tag
              v-for="(item, index) in hardware.bundle_with"
              :key="index"
              type="info"
            >
              {{ item }}
            </el-tag>
          </div>
        </template>
        <template v-else> - </template>
      </template>
    </el-descriptions-item>
  </el-descriptions>

  <!-- Notes -->
  <el-descriptions
    direction="vertical"
    :column="1"
    border
  >
    <template #title>
      <h1 class="font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-clipboard-list"
          text="Note"
        ></base-icon-text>
      </h1>
    </template>

    <el-descriptions-item label="Note">
      {{ hardware.note || '-' }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseIconText from '@/components/base/base-icon-text.vue'

export default defineComponent({
  name: 'hardware-information',
  components: { BaseIconText },
  props: {
    hardware: {
      required: true,
      type: Object as PropType<Hardware>
    }
  },
  setup: () => {
    return {}
  }
})
</script>

<style scoped></style>
