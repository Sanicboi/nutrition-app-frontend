<template>
    <main class="flex flex-col justify-between items-stretch min-h-screen py-4 px-8 pb-0">
        <div class="flex flex-col items-stretch justify-start">
            <h1 class="text-4xl text-center font-bold mt-8">Training</h1>
            <div class="h-10 bg-neutral-200 mt-4 rounded-full">
                <div class="h-10 rounded-full" :style="styles">
                </div>
            </div>
            <h2 class="mt-4 text-lg font-semibold">Overall training score for today: <span :style="color">{{ score }}%</span></h2>
            <h2 class="text-lg text-left font-bold mt-8">Calories burned goal: <span> 0%</span></h2>
            <p>Currently burned calories: <span>0</span></p>
            <p>Target burned calories: <span>1100</span></p>
            <button class="btn-1 mt-8">Add Exercise</button>
            <button class="btn-1 mt-8 mb-8">Change Training Plan</button>
        </div>
        <NavBar></NavBar>
    </main>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { computed, ref } from 'vue';
let score = ref(0);
let color = computed(() => {
    return `color: color-mix(in lab, #ff0000 ${100 - score.value}%, #00ff00 ${score.value}%);`
})
let styles = computed(() => {
    return `width: ${Math.round(score.value)}%; background-${color.value}`
});
    
</script>
<style scoped>

</style>