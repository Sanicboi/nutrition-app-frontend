<template>
    <nav class="sticky bottom-0 flex flex-row justify-between align-center">
        <div class="flex p-2 rounded-lg flex-col text-center items-center cursor-pointer" :class="isSelected('/training') ? 'sel' : ''" @click="router.push('/training')">
            <i class="ri-run-line text-2xl"></i>
            <p class="font-semibold text-lg leading-none">Training</p>
        </div>
        <div class="flex p-2 rounded-lg flex-col text-center items-center cursor-pointer":class="isSelected('/') ? 'sel' : ''" @click="router.push('/')">
            <i class="ri-restaurant-2-line text-2xl"></i>
            <p class="font-semibold text-lg leading-none">Nutrition</p>
        </div>
        <div class="flex p-2 rounded-lg flex-col text-center items-center cursor-pointer" :class="isSelected('/profile') ? 'sel' : ''" @click="router.push('/profile')">
            <i class="ri-user-3-fill text-2xl"></i>
            <p class="font-semibold text-lg leading-none">Profile</p>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isSelected = (path: string) => route.path === path; 
</script>
<style scoped>
.sel {
    @apply bg-neutral-200;
}
</style>