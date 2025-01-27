<script setup lang="ts">
import { RouterView } from 'vue-router';






</script>

<template>
  <main class="flex flex-col justify-stretch items-stretch min-h-screen">
    <RouterView></RouterView>
  </main>
  <nav class="sticky bottom-0 h-10 py-8 px-8 flex justify-between align-center bg-neutral-200 font-semibold text-xl">
    <button class="btn">
      <i class="ri-run-line"></i>
      <p class="">Training</p>
    </button>
    <button class="btn">
      <i class="ri-restaurant-line"></i>
      <p class="">Nutrition</p>
    </button>
    <button class="btn">
      <i class="ri-user-line"></i>
      <p class="">Profile</p>
    </button>
  </nav>

</template>

<style scoped>
.btn {
  @apply text-center leading-none flex flex-col items-center justify-center;
}
</style>