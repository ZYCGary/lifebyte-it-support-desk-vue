<template>
  <el-form
    v-if="form.show"
    ref="formRef"
    :model="information"
    :rules="rules"
    label-position="top"
    status-icon
    class="grid grid-cols-2 gap-x-4"
  >
    <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
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

    <h1 class="mb-4 font-semibold text-xl">
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
      <el-input v-model="information.serial_number" />
    </el-form-item>
    <el-form-item
      label="Tag"
      prop="tag"
    >
      <el-input v-model="information.tag" />
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
      brandOptions: ['Apple', 'MicroSoft', 'UGreen']
    })

    const rules = {}

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

    const handleSave = (formEl: FormInstance | undefined) => {
      console.log('save', formEl)
    }

    return { formRef, form, information, rules, handleCancel, handleSave }
  }
})
</script>

<style scoped></style>
