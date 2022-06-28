<script setup lang="ts"></script>

<template>
  <router-view :key="$route.path"></router-view>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
