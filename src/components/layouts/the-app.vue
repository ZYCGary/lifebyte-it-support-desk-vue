<template>
  <template v-if="isAdmin">
    <div class="w-full h-full">
      <the-header></the-header>
      <the-side-menu></the-side-menu>
      <div class="fixed left-72 top-14 bottom-0 right-0">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TheHeader from '@/components/layouts/the-header.vue'
import { useStore } from '@/store'
import TheSideMenu from '@/components/layouts/the-side-menu.vue'

export default defineComponent({
  name: 'the-app',
  components: { TheSideMenu, TheHeader },
  props: {},
  setup() {
    const store = useStore()

    const isAdmin = computed(() => store.getters['auth/isAdmin'])

    return { isAdmin }
  }
})
</script>

<style scoped lang="postcss"></style>
