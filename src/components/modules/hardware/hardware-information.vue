<template>
  <div v-if="!editable">
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

      <template #extra>
        <div class="flex flex-row flex-nowrap justify-end">
          <base-button
            icon-class="fa-solid fa-pen-to-square"
            type="primary"
            @click="editable = true"
          >
            Update
          </base-button>
        </div>
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
        {{ Boolean(hardware.description) ? hardware.description : 'No description.' }}
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
      <el-descriptions-item label="Serial Number">{{ hardware.serial_number }}</el-descriptions-item>
      <el-descriptions-item label="Tag">{{ hardware.tag }}</el-descriptions-item>
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
        {{ hardware.spec_os }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
        label="CPU"
        width="25%"
      >
        {{ hardware.spec_cpu }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Desktop', 'Laptop', 'Others'].includes(hardware.type)"
        label="Memory (GB)"
        width="25%"
      >
        {{ hardware.spec_memory }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Desktop', 'Laptop', 'TV', 'Others'].includes(hardware.type)"
        label="Screen Size (inch)"
        width="25%"
      >
        {{ hardware.spec_screen_size }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Desktop', 'Laptop', 'TV', 'Docking Station', 'Others'].includes(hardware.type)"
        label="Ports"
        width="25%"
      >
        <template #default>
          <div class="flex flex-row flex-wrap gap-2">
            <el-tag
              v-for="(port, index) in hardware.spec_ports"
              :key="index"
              type="info"
            >
              {{ port }}
            </el-tag>
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Adapter', 'Others'].includes(hardware.type)"
        label="Input"
        width="25%"
      >
        {{ hardware.spec_adapter_input }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Adapter', 'Others'].includes(hardware.type)"
        label="Output"
        width="25%"
      >
        <template #default>
          <div class="flex flex-row flex-wrap gap-2">
            <el-tag
              v-for="(output, index) in hardware.spec_adapter_output"
              :key="index"
              type="info"
            >
              {{ output }}
            </el-tag>
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item
        v-if="['Keyboard', 'Mouse', 'Adapter', 'Others'].includes(hardware.type)"
        label="Cable Length"
        width="25%"
      >
        {{ hardware.spec_cable_length }}
      </el-descriptions-item>
      <el-descriptions-item
        label="Others"
        width="25%"
      >
        {{ hardware.spec_others }}
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
            text="Notes"
          ></base-icon-text>
        </h1>
      </template>

      <el-descriptions-item label="Bundle With">
        <template #default>
          <div
            v-for="(item, index) in hardware.together"
            :key="index"
            class="my-2"
          >
            <el-tag type="info">
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="Note">
        {{ hardware.note }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div v-else>
    <hardware-information-form
      type="update"
      :hardware="hardware"
      @success="handleHardwareUpdated"
      @cancel="editable = false"
    ></hardware-information-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import { useRoute } from 'vue-router'
import BaseIconText from '@/components/base/base-icon-text.vue'
import BaseButton from '@/components/base/base-button.vue'
import HardwareInformationForm from '@/components/modules/hardware/hardware-information-form.vue'

export default defineComponent({
  name: 'hardware-information',
  components: { HardwareInformationForm, BaseButton, BaseIconText },
  props: {
    hardware: {
      required: true,
      type: Object as PropType<Hardware>
    }
  },
  emits: ['update:hardware'],
  setup: () => {
    const editable = ref(false)

    const route = useRoute()

    if (route.params?.type === 'update') editable.value = true

    const handleHardwareUpdated = () => {
      console.log('hardware updated')
    }

    return { editable, handleHardwareUpdated }
  }
})
</script>

<style scoped></style>
