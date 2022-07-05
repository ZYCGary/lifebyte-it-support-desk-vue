<template>
  <el-form
    v-if="form.show"
    ref="formRef"
    :model="information"
    :rules="rules"
    label-position="top"
    status-icon
  >
    <!-- Information -->
    <div class="grid grid-cols-2 gap-x-4 mb-6">
      <h1 class="col-span-2 mb-4 font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-circle-info"
          text="Information"
        ></base-icon-text>
      </h1>
      <el-form-item
        label="Name"
        prop="name"
        class="col-span-2"
      >
        <el-input v-model="information.name" />
      </el-form-item>
      <el-form-item
        label="Description"
        prop="description"
        class="col-span-2"
      >
        <el-input
          v-model="information.description"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        label="Type"
        prop="type"
      >
        <el-select
          v-model="information.type"
          placeholder="Select a type"
          class="w-full"
        >
          <el-option
            v-for="(item, index) in form.typeOptions"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Brand"
        prop="brand"
      >
        <el-select
          v-model="information.brand"
          placeholder="Select/Input a brand"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="(brand, index) in form.brandOptions"
            :key="index"
            :value="brand"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Serial Number"
        prop="serial_number"
      >
        <el-input
          v-model="information.serial_number"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="Tag"
        prop="tag"
      >
        <el-input
          v-model="information.tag"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="User"
        prop="user"
      >
        <el-select
          v-model="information.user"
          value-key="id"
          filterable
          placeholder="Select a User"
          class="w-full"
        >
          <el-option
            v-for="user in form.userOptions"
            :key="user['id']"
            :label="`${user['name']} (${user['email']})`"
            :value="user"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Location"
        prop="location"
      >
        <el-input
          :value="`${information.user.location.name} - ${information.user.location.country}`"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="Availability"
        prop="availability"
      >
        <el-input
          :value="information.user.type === 'Storage' ? 'In Stock' : 'In Use'"
          disabled
        />
      </el-form-item>
    </div>

    <!-- Specifications -->
    <div class="grid grid-cols-2 gap-x-4 mb-6">
      <h1 class="col-span-2 mb-4 font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-gear"
          text="Specifications"
        ></base-icon-text>
      </h1>
      <el-form-item
        v-if="['Desktop', 'Laptop', 'Others'].includes(information.type)"
        label="Operating System"
        prop="spec_os"
      >
        <el-select
          v-model="information.spec_os"
          placeholder="Select/Input an Operating System"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="os in form.osOptions"
            :key="os.value"
            :label="os.label"
            :value="os.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="['Desktop', 'Laptop', 'Others'].includes(information.type)"
        label="CPU"
        prop="spec_cpu"
      >
        <el-select
          v-model="information.spec_cpu"
          placeholder="Select/Input a CPU"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="cpu in form.cpuOptions"
            :key="cpu.value"
            :label="cpu.label"
            :value="cpu.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="['Desktop', 'Laptop', 'Others'].includes(information.type)"
        label="Memory"
        prop="spec_memory"
      >
        <el-input-number
          v-model="information.spec_memory"
          :min="0"
          class="w-full"
        />
      </el-form-item>
      <el-form-item
        v-if="['Desktop', 'Laptop', 'Others', 'TV'].includes(information.type)"
        label="Screen Size"
        prop="spec_screen_size"
      >
        <el-input-number
          v-model="information.spec_screen_size"
          :min="0"
          :step="0.5"
          class="w-full"
        />
      </el-form-item>
      <el-form-item
        v-if="['Desktop', 'Laptop', 'TV', 'Docking Station', 'Others'].includes(information.type)"
        label="Ports"
        prop="spec_ports"
      >
        <el-select
          v-model="information.spec_ports"
          placeholder="Select/Input ports"
          class="w-full"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="port in form.portOptions"
            :key="port.value"
            :label="port.label"
            :value="port.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="['Adapter', 'Others'].includes(information.type)"
        label="Input"
        prop="spec_adapter_input"
      >
        <el-select
          v-model="information.spec_adapter_input"
          placeholder="Select/Input a type"
          class="w-full"
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="port in form.portOptions"
            :key="port.value"
            :label="port.label"
            :value="port.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="['Adapter', 'Others'].includes(information.type)"
        label="Output"
        prop="spec_adapter_output"
      >
        <el-select
          v-model="information.spec_adapter_output"
          placeholder="Select/Input ports"
          class="w-full"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="port in form.portOptions"
            :key="port.value"
            :label="port.label"
            :value="port.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="['Keyboard', 'Mouse', 'Adapter', 'Others'].includes(information.type)"
        label="Cable Length"
        prop="spec_cable_length"
      >
        <el-input-number
          v-model="information.spec_cable_length"
          :min="0"
          :step="0.5"
          class="w-full"
        />
      </el-form-item>
      <el-form-item
        label="Others"
        prop="spec_others"
        class="col-span-2"
      >
        <el-input
          v-model="information.spec_others"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </div>

    <!-- Notes -->
    <div class="grid mb-6">
      <h1 class="mb-4 font-semibold text-xl">
        <base-icon-text
          icon-class="fa-solid fa-clipboard-list"
          text="Notes"
        ></base-icon-text>
      </h1>
      <el-form-item
        label="Bundle With"
        prop="together"
      >
        <el-select
          v-model="information.together"
          placeholder="Select/Input bundle items"
          class="w-full"
          multiple
          clearable
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="(item, index) in form.bundleOptions"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Note"
        prop="note"
      >
        <el-input
          v-model="information.note"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </div>

    <div class="flex flex-row flex-nowrap justify-end">
      <el-form-item>
        <base-button
          icon-class="fa-solid fa-check"
          type="success"
          :loading="form.submitting"
          @click="handleSave(formRef)"
        >
          Save
        </base-button>
        <base-button
          icon-class="fa-solid fa-ban"
          type="info"
          @click="handleCancel"
        >
          Cancel
        </base-button>
      </el-form-item>
    </div>
  </el-form>
  <div
    v-loading="form.loading"
    v-show="!form.show"
    class="h-72"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseButton from '@/components/base/base-button.vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus/es'
import apis from '@/http/apis'
import { User } from '@/types/store/user.module.type'
import BaseIconText from '@/components/base/base-icon-text.vue'

export default defineComponent({
  name: 'hardware-information-form',
  components: { BaseIconText, BaseButton },
  emits: ['cancel', 'success'],
  props: {
    type: {
      require: true,
      type: String as PropType<'create' | 'update'>
    },
    hardware: {
      require: true,
      type: Object as PropType<Hardware>
    }
  },
  setup: (props, { emit }) => {
    const formRef = ref()

    const information = reactive({ ...props.hardware })

    const form = reactive({
      loading: true,
      show: false,
      submitting: false,
      userOptions: [] as User[],
      typeOptions: ['Desktop', 'Laptop', 'Mouse', 'Keyboard', 'Adapter', 'Docking Station', 'TV', 'Others'],
      brandOptions: ['Apple', 'MicroSoft', 'UGreen', 'Unknown Brand'],
      osOptions: [
        { label: '-', value: null },
        { label: 'Windows', value: 'Windows' },
        { label: 'macOS', value: 'macOS' },
        { label: 'Linux', value: 'Linux' }
      ],
      cpuOptions: [
        { label: '-', value: null },
        { label: 'Apple M1', value: 'Apple M1' },
        { label: 'Apple M1 Pro', value: 'Apple M1 Pro' },
        { label: 'Apple M1 Max', value: 'Apple M1 Max' },
        { label: 'Apple M1 Ultra', value: 'Apple M1 Ultra' },
        { label: 'Apple M2', value: 'Apple M2' },
        { label: 'Intel Core i9', value: 'Intel Core i9' },
        { label: 'Intel Core i5', value: 'Intel Core i5' }
      ],
      portOptions: [
        { label: '-', value: null },
        { label: 'USB-A', value: 'USB-A' },
        { label: 'USB-C', value: 'USB-C' },
        { label: 'HDMI', value: 'HDMI' },
        { label: 'DisplayPort', value: 'DisplayPort' },
        { label: 'Mini DisplayPort', value: 'Mini DisplayPort' },
        { label: 'Ethernet', value: 'Ethernet' },
        { label: '3.5-mm headphone jack', value: '3.5-mm headphone jack' },
        { label: 'Card Slot', value: 'Card Slot' }
      ],
      bundleOptions: ['Charger Cable', 'Power Adapter', 'Receiver', 'Remote']
    })

    const rules = {
      name: [{ required: true, message: `Please input hardware's name` }],
      type: [{ required: true, message: `Please select hardware's type` }],
      brand: [{ required: true, message: `Please select/input hardware's brand` }],
      serial_number: [{ required: true, message: `Please input hardware's serial number` }],
      tag: [{ required: true, message: `Please input hardware's tag` }],
      user: [{ required: true, message: `Please select hardware's user` }]
    }

    apis.user
      .getUserCollection({ pagination: false })
      .then((response) => {
        form.loading = false
        form.show = true
        form.userOptions = response?.data as User[]
      })
      .catch(() => {
        form.loading = false
        ElMessage({
          type: 'error',
          message: 'Failed to load edit form, please try again later.'
        })
        emit('cancel')
      })

    const handleCancel = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          formRef.value?.resetFields()
          emit('cancel')
        })
        .catch()
    }

    const updateHardware = () => {
      apis.hardware
        .updateHardware(props.hardware.id, { ...information })
        .then(() => {
          form.submitting = false

          ElMessage({
            type: 'success',
            message: 'Update user profile successfully.'
          })

          emit('success', information)
        })
        .catch((error) => {
          form.submitting = false

          const response = error.response.data

          if (response.status === 422) {
            ElMessage({
              type: 'error',
              message: response.message
            })
          } else {
            ElMessage({
              type: 'error',
              message: 'Something wrong when updating hardware information.'
            })
          }
        })
    }

    const createHardware = () => {
      console.log('create')
    }

    const handleSave = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      if (!props.type || (props.type !== 'create' && props.type !== 'update')) handleCancel()

      formEl.validate((valid) => {
        if (valid) {
          form.submitting = true

          if (props.type === 'update') updateHardware()
          if (props.type === 'create') createHardware()
        }
      })
    }

    return { formRef, form, information, rules, handleCancel, handleSave }
  }
})
</script>

<style scoped></style>
