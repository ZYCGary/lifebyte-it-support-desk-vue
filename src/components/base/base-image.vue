<template>
  <el-image
    :src="imageSrc"
    :alt="alt"
    v-bind="$attrs"
  ></el-image>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'base-image',
  props: {
    src: {
      required: true,
      type: String
    },
    alt: {
      required: false,
      type: String,
      default: 'LifeByte image'
    }
  },
  setup(props) {
    const imageSrc = ref<String>('')

    const imageGlobModules = import.meta.glob('@/assets/images/**/*')

    watchEffect(() => {
      const imageModule = imageGlobModules[`../../assets/images/${props.src}`]
      if (imageModule) {
        imageModule().then((image) => {
          imageSrc.value = image.default
        })
      } else {
        imageSrc.value = props.src
      }
    })

    return { imageSrc }
  }
})
</script>

<style scoped></style>
