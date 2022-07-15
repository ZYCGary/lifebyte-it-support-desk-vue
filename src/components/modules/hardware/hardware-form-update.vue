<template>
  <!-- Skeleton -->
  <template v-if="loadingHardware.show || loadingUser.collection">
    <el-skeleton
      :count="8"
      class="grid grid-cols-2 gap-4"
    >
      <template #template>
        <div>
          <el-skeleton-item
            variant="h1"
            class="w-40"
          ></el-skeleton-item>
          <el-skeleton-item
            variant="button"
            class="w-full"
          ></el-skeleton-item>
        </div>
      </template>
    </el-skeleton>
  </template>
  <!-- Skeleton end -->

  <template v-else>
    <template v-if="hardwareError.show || userError.collection">
      <div class="text-center">Hardware not found</div>
    </template>

    <!-- Hardware update form -->
    <template v-else>
      <el-form
        v-if="form.data"
        ref="formRef"
        :model="form.data"
        :rules="form.rules"
        label-position="top"
        status-icon
        scroll-to-error
      >
        <!-- IDs -->
        <div class="grid grid-cols-2 gap-x-4 mb-6">
          <h1 class="col-span-2 mb-4 font-semibold text-xl">
            <base-icon-text
              icon-class="fa-solid fa-tags"
              text="IDs"
            ></base-icon-text>
          </h1>
          <el-form-item
            label="Serial Number"
            prop="serial_number"
          >
            <el-input
              v-model="form.data.serial_number"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="Tag"
            prop="tag"
          >
            <el-input
              v-model="form.data.tag"
              clearable
            />
          </el-form-item>
        </div>
        <!-- Ids -->

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
            <el-input v-model="form.data.name" />
          </el-form-item>
          <el-form-item
            label="Description"
            prop="description"
            class="col-span-2"
          >
            <el-input
              v-model="form.data.description"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
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
              v-model="form.data.brand"
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
            label="Model"
            prop="model"
          >
            <el-input v-model="form.data.model" />
          </el-form-item>
          <el-form-item
            label="User"
            prop="user"
          >
            <el-select
              v-model="form.data.user"
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
            v-if="form.data.user?.location"
            label="Location"
            prop="location"
          >
            <el-input
              :value="`${form.data.user.location.name} - ${form.data.user.location.country}`"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="Availability"
            prop="availability"
          >
            <el-input
              :value="form.data.user.type === 'Storage' ? 'In Stock' : 'In Use'"
              disabled
            />
          </el-form-item>
        </div>
        <!-- Information end -->

        <!-- Specifications -->
        <div class="grid grid-cols-2 gap-x-4 mb-6">
          <h1 class="col-span-2 mb-4 font-semibold text-xl">
            <base-icon-text
              icon-class="fa-solid fa-gear"
              text="Specifications"
            ></base-icon-text>
          </h1>
          <el-form-item
            v-if="['Desktop', 'Laptop', 'Others'].includes(form.data.type)"
            label="Operating System"
            prop="spec_os"
          >
            <el-select
              v-model="form.data.spec_os"
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
            v-if="['Desktop', 'Laptop', 'Others'].includes(form.data.type)"
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
                v-for="cpu in form.cpuOptions"
                :key="cpu.value"
                :label="cpu.label"
                :value="cpu.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="['Desktop', 'Laptop', 'Others'].includes(form.data.type)"
            label="Memory (GB)"
            prop="spec_memory"
          >
            <el-input-number
              v-model="form.data.spec_memory"
              :min="0"
              class="w-full"
            />
          </el-form-item>
          <el-form-item
            v-if="['Desktop', 'Laptop', 'Others'].includes(form.data.type)"
            label="Storage (GB)"
            prop="spec_storage"
          >
            <el-input-number
              v-model="form.data.spec_storage"
              :min="0"
              class="w-full"
            />
          </el-form-item>
          <el-form-item
            v-if="['Desktop', 'Laptop', 'Others', 'TV', 'Monitor'].includes(form.data.type)"
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
          <el-form-item
            label="Bundle With"
            prop="bundle_with"
            class="col-span-2"
          >
            <el-select
              v-model="form.data.bundle_with"
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
            label="Other Specifications"
            prop="spec_others"
            class="col-span-2"
          >
            <el-input
              v-model="form.data.spec_others"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
        </div>
        <!-- Specifications end -->

        <!-- Note -->
        <div class="grid mb-6">
          <h1 class="mb-4 font-semibold text-xl">
            <base-icon-text
              icon-class="fa-solid fa-clipboard-list"
              text="Note"
            ></base-icon-text>
          </h1>
          <el-form-item prop="note">
            <el-input
              v-model="form.data.note"
              type="textarea"
              :rows="4"
            />
          </el-form-item>
        </div>
        <!-- Note end -->

        <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
          <el-form-item>
            <base-button
              icon-class="fa-solid fa-check"
              type="success"
              :loading="form.submitting"
              @click="handleUpdate(formRef)"
            >
              Update
            </base-button>
            <base-button
              icon-class="fa-solid fa-ban"
              type="info"
              :disabled="form.submitting"
              @click="$emit('cancel')"
            >
              Cancel
            </base-button>
          </el-form-item>
        </div>
      </el-form>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { User } from '@/types/store/user.module.type'
import useHardware from '@/hooks/useHardware'
import { ElMessage, FormInstance } from 'element-plus/es'
import useUser from '@/hooks/useUser'
import { Hardware } from '@/types/store/hardware.module.type'
import BaseIconText from '@/components/base/base-icon-text.vue'
import BaseButton from '@/components/base/base-button.vue'

export default defineComponent({
  name: 'hardware-form-update',
  components: { BaseButton, BaseIconText },
  props: {
    hardwareId: {
      required: true,
      type: Number
    }
  },
  emits: ['cancel', 'updated'],
  setup: (props, { emit }) => {
    const formRef = ref()

    const form = reactive({
      submitting: false,
      data: null as Hardware | null,
      userOptions: [] as User[],
      typeOptions: [
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
      brandOptions: ['Apple', 'MicroSoft', 'UGreen', 'Unknown Brand'],
      osOptions: [
        { label: '-', value: '' },
        { label: 'Windows', value: 'Windows' },
        { label: 'macOS', value: 'macOS' },
        { label: 'Linux', value: 'Linux' }
      ],
      cpuOptions: [
        { label: '-', value: '' },
        { label: 'Apple M1', value: 'Apple M1' },
        { label: 'Apple M1 Pro', value: 'Apple M1 Pro' },
        { label: 'Apple M1 Max', value: 'Apple M1 Max' },
        { label: 'Apple M1 Ultra', value: 'Apple M1 Ultra' },
        { label: 'Apple M2', value: 'Apple M2' },
        { label: 'Intel Core i9', value: 'Intel Core i9' },
        { label: 'Intel Core i7', value: 'Intel Core i7' },
        { label: 'Intel Core i5', value: 'Intel Core i5' }
      ],
      bundleOptions: ['Charger Cable', 'Power Adapter', 'Receiver', 'Remote'],
      rules: {
        name: [{ required: true, message: `Please input hardware name` }],
        type: [{ required: true, message: `Please select hardware type` }],
        brand: [{ required: true, message: `Please select/input hardware brand` }],
        model: [{ required: true, message: `Please input hardware model` }],
        serial_number: [{ required: true, message: `Please input hardware serial number` }],
        tag: [{ required: true, message: `Please input hardware tag` }],
        user: [{ required: true, message: `Please select a user` }]
      }
    })

    const { loading: loadingHardware, error: hardwareError, getHardwareById, updateHardware } = useHardware()
    const { loading: loadingUser, error: userError, getUserCollection } = useUser()

    const handleUpdate = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid && form.data) {
          form.submitting = true

          updateHardware(props.hardwareId, form.data)
            .then(() => {
              form.submitting = false

              ElMessage({
                type: 'success',
                message: 'Update user profile successfully.'
              })

              emit('updated')
            })
            .catch(() => {
              form.submitting = false

              ElMessage({
                type: 'error',
                message: 'Failed to update user profile.'
              })
            })
        }
      })
    }

    getHardwareById(props.hardwareId)
      .then((hardware) => {
        form.data = { ...hardware }
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Hardware not found.'
        })

        emit('cancel')
      })

    getUserCollection({ paginate: false })
      .then((users) => {
        form.userOptions = users.data
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Failed to show update form.'
        })

        emit('cancel')
      })

    return { formRef, form, loadingHardware, hardwareError, loadingUser, userError, handleUpdate }
  }
})
</script>

<style scoped></style>
