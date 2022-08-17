<script setup lang="ts"></script>

<template>
  <router-view :key="$route.path" />
</template>

<style lang="scss">
#app {
  @apply container h-screen mx-auto p-15;
  @apply grid grid-cols-12;
}
</style>
