<template>
  <!-- Skeleton -->
  <template v-if="loadingUser.collection">
    <el-skeleton
      :count="1"
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
    <!-- Hardware return form -->
    <template v-if="!userError.collection">
      <el-form
        ref="formRef"
        :model="form.data"
        :rules="form.rules"
        label-position="top"
        status-icon
        scroll-to-error
      >
        <el-form-item
          label="Return To"
          prop="return_to"
        >
          <el-select
            v-model="form.data.return_to"
            value-key="id"
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
        <div class="col-span-2 flex flex-row flex-nowrap justify-end mt-4">
          <el-form-item>
            <base-button
              type="primary"
              :loading="loadingHardware.update"
              @click="handleReturn(formRef)"
            >
              Return
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
import useUser from '@/hooks/useUser'
import { ElMessage, FormInstance } from 'element-plus/es'
import BaseButton from '@/components/base/base-button.vue'
import useHardware from '@/hooks/useHardware'

export default defineComponent({
  name: 'hardware-form-return',
  components: { BaseButton },
  emits: ['cancel', 'returned'],
  props: {
    hardwareId: {
      required: true,
      type: Number
    }
  },
  setup: (props, { emit }) => {
    const formRef = ref()

    const form = reactive({
      submitting: false,
      data: {
        return_to: {} as User
      },
      userOptions: [] as User[],
      rules: {
        return_to: [
          {
            type: 'object',
            required: true,
            fields: {
              id: [{ required: true, type: 'number', message: 'Please select a storage' }]
            }
          }
        ]
      }
    })

    const { loading: loadingUser, error: userError, getUserCollection } = useUser()
    const { loading: loadingHardware, returnHardware } = useHardware()

    const handleReturn = (formEl: FormInstance | undefined) => {
      if (!formEl) return

      formEl.validate((valid) => {
        if (valid && form.data) {
          form.submitting = true

          returnHardware(props.hardwareId, form.data.return_to)
            .then(() => {
              ElMessage({
                type: 'success',
                message: 'Return this hardware successfully.'
              })

              emit('returned')
            })
            .catch(() => {
              ElMessage({
                type: 'error',
                message: 'Failed to return this hardware'
              })
            })
        }
      })
    }

    getUserCollection({ type: 'Storage', paginate: false })
      .then((users) => {
        form.userOptions = users.data
        form.data.return_to = form.userOptions[0]
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Failed to show return form.'
        })

        emit('cancel')
      })

    return { loadingUser, userError, formRef, form, handleReturn, loadingHardware }
  }
})
</script>

<style scoped></style>
