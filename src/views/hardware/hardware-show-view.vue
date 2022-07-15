<!--<template>-->
<!--  <the-content-header>-->
<!--    <hardware-show-header-->
<!--      v-if="hardware"-->
<!--      :hardware="hardware"-->
<!--    ></hardware-show-header>-->
<!--  </the-content-header>-->
<!--  <el-container-->
<!--    v-loading="loading"-->
<!--    class="relative"-->
<!--  >-->
<!--    <template v-if="!error && hardware">-->
<!--      <el-main>-->
<!--        <hardware-information v-model:hardware="hardware"></hardware-information>-->
<!--      </el-main>-->
<!--    </template>-->

<!--    <template v-else>-->
<!--      <el-main-->
<!--        v-if="!loading"-->
<!--        class="text-center"-->
<!--      >-->
<!--        {{ error }}-->
<!--      </el-main>-->
<!--    </template>-->
<!--  </el-container>-->
<!--</template>-->
<template>
  <the-main-content>
    <template #header>
      <div class="flex flex-row flex-nowrap items-center">
        <h1>Hardware Detail</h1>
        <div class="flex flex-1 justify-end">
          <base-button
            icon-class="fa-solid fa-rotate-left"
            type="warning"
          >
            Return
          </base-button>
          <base-button
            icon-class="fa-solid fa-trash-can"
            type="danger"
          >
            Delete
          </base-button>
        </div>
      </div>
    </template>

    <template #content>
      <el-container class="h-full">
        <el-main>
          <!-- Hardware loading skeleton -->
          <template v-if="loading.show">
            <el-skeleton
              animated
              style="--el-skeleton-circle-size: 2.25rem"
            >
              <template #template>
                <el-skeleton-item
                  variant="circle"
                  style="width: 36px"
                ></el-skeleton-item>
              </template>
            </el-skeleton>
            <el-skeleton :rows="7"></el-skeleton>
          </template>
          <!-- Hardware loading skeleton end -->

          <template v-else>
            <template v-if="!error.show && hardware">
              <!-- Heading -->
              <div class="flex flex-row flex-nowrap items-center mb-8">
                <base-avatar
                  type="icon"
                  :icon="avatar"
                ></base-avatar>
                <div class="mx-4">
                  <h1 class="mb-2 font-bold text-2xl">
                    {{ hardware.name }}
                  </h1>
                  <el-tag
                    effect="dark"
                    class="mr-1"
                    round
                  >
                    {{ hardware.serial_number }}
                  </el-tag>
                  <el-tag
                    type="success"
                    effect="dark"
                    round
                  >
                    {{ hardware.tag }}
                  </el-tag>
                </div>
              </div>
              <!-- Heading end -->

              <el-tabs v-model="activeTab">
                <!-- Hardware information -->
                <el-tab-pane
                  label="Information"
                  name="information"
                >
                  <hardware-information :hardware="hardware"></hardware-information>
                  <div class="flex flex-row flex-nowrap justify-end mt-4">
                    <base-button
                      icon-class="fa-solid fa-pen-to-square"
                      type="primary"
                      @click="updateHardwareDialogVisible = true"
                    >
                      Edit
                    </base-button>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
          </template>
        </el-main>
      </el-container>
    </template>
  </the-main-content>

  <!-- Hardware update dialog -->
  <el-dialog
    v-model="updateHardwareDialogVisible"
    title="Update Hardware"
    :destroy-on-close="true"
    :before-close="closeUpdateDialog"
  >
    <hardware-form-update
      :hardware-id="hardwareId"
      @cancel="closeUpdateDialog"
      @updated="handleHardwareUpdated"
    ></hardware-form-update>
  </el-dialog>
  <!-- Hardware update dialog end -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import TheMainContent from '@/components/layouts/the-main-content.vue'
import BaseButton from '@/components/base/base-button.vue'
import { Hardware } from '@/types/store/hardware.module.type'
import useHardware from '@/hooks/useHardware'
import { ElMessage, ElMessageBox } from 'element-plus/es'
import BaseAvatar from '@/components/base/base-avatar.vue'
import HardwareInformation from '@/components/modules/hardware/hardware-information.vue'
import HardwareFormUpdate from '@/components/modules/hardware/hardware-form-update.vue'

export default defineComponent({
  name: 'hardware-show-view',
  components: { HardwareFormUpdate, HardwareInformation, BaseAvatar, BaseButton, TheMainContent },
  props: {},
  setup: () => {
    const route = useRoute()
    const hardwareId = parseInt(route.params.id as string)

    const hardware = ref<Hardware | null>(null)
    const avatar = ref<string>('')

    const { loading, error, getHardwareById } = useHardware()
    const loadHardware = () => {
      getHardwareById(hardwareId)
        .then((res) => {
          hardware.value = res

          switch (hardware.value.type) {
            case 'Desktop':
              avatar.value = 'fa-solid fa-computer'
              break

            case 'Laptop':
              avatar.value = 'fa-solid fa-laptop'
              break

            case 'Mouse':
              avatar.value = 'fa-solid fa-computer-mouse'
              break

            case 'Keyboard':
              avatar.value = 'fa-solid fa-keyboard'
              break

            case 'Docking Station':
              avatar.value = 'fa-solid fa-ethernet'
              break

            case 'Adapter':
              avatar.value = 'fa-solid fa-shuffle'
              break

            case 'TV':
              avatar.value = 'fa-solid fa-tv'
              break

            case 'Monitor':
              avatar.value = 'fa-solid fa-desktop'
              break

            case 'Phone':
              avatar.value = 'fa-solid fa-phone'
              break

            default:
              avatar.value = 'fa-solid fa-ellipsis'
              break
          }
        })
        .catch(() => {
          ElMessage({
            type: 'error',
            message: 'Failed to get hardware details.'
          })
        })
    }

    const activeTab = ref<string>('information')

    const updateHardwareDialogVisible = ref<boolean>(false)

    const closeUpdateDialog = () => {
      ElMessageBox.confirm('Your edit will not be saved. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          updateHardwareDialogVisible.value = false
        })
        .catch(() => {})
    }

    const handleHardwareUpdated = () => {
      updateHardwareDialogVisible.value = false
      loadHardware()
    }

    if (hardwareId) {
      loadHardware()
    }
    return {
      hardware,
      hardwareId,
      avatar,
      loading,
      error,
      activeTab,
      updateHardwareDialogVisible,
      closeUpdateDialog,
      handleHardwareUpdated
    }
  }
})
</script>

<style scoped></style>
