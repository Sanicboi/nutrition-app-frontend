<template>
    <main class="flex flex-col justify-between items-stretch min-h-screen py-4 px-8 pb-0">
        <div class="flex flex-col items-stretch justify-start">
            <h1 class="text-4xl text-center font-bold mt-8">Nutrition</h1>
            <div class="h-10 bg-neutral-200 mt-4 rounded-full">
                <div class="h-10 rounded-full" :style="styles">
                </div>
            </div>
            <h2 class="mt-4 text-lg font-semibold">Overall nutrition score for today: <span :style="color">{{ score
            }}%</span></h2>
            <h2 class="text-lg text-left font-bold mt-8">Calories goal: <span> {{calorieScore}}%</span></h2>
            <p>Current calories: <span>{{report.report.totalCaloriesEaten}}</span></p>
            <p>Target calories:  <span>{{ toEat }}</span></p>
            <h2 class="text-lg text-left font-bold mt-8">Protein goal: <span>{{ proteinScore }} %</span></h2>
            <p>Current protein: <span>{{ report.report.totalProteinsEaten }}</span></p>
            <p>Target protein intake: <span>{{ proteinGoal }}g</span></p>
            <h2 class="text-lg text-left font-bold mt-8">Water goal: <span>{{ waterScore }} %</span></h2>
            <p>Water drunk today: <span>{{ report.report.waterDrunkToday }}L</span></p>
            <p>Target water volume: <span>{{ water }}L</span></p>
            <button class="btn-1 mt-8">Add Food</button>
            <button class="btn-1 mt-8">Add Water</button>
            <button class="btn-1 mt-8 mb-8">Change Nutrition Plan</button>
        </div>
        <NavBar></NavBar>
    </main>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import axios, { AxiosError } from 'axios';
import { computed, onMounted, reactive, ref, type Reactive } from 'vue';

let data: Reactive<{
    user: {
        username: string,
        age: number | null,
        activityLevel: 'low' | 'medium' | 'high' | 'professional',
        height: number | null,
        weight: number | null,
        filledProfile: boolean
    }
}> = reactive({
    user: {
        username: '',
        age: null,
        activityLevel: 'low',
        height: null,
        weight: null,
        filledProfile: false
    }
});

let report: Reactive<{
    report: {
        caloriesBurnedByExercise: number;
        caloriesBurnedByRest: number;
        totalCaloriesBurned: number;
        totalCaloriesEaten: number;
        totalProteinsEaten: number;
        totalFatsEaten: number;
        totalCarbsEaten: number;
        waterDrunkToday: number;
    }
}> = reactive({
    report: {
        caloriesBurnedByExercise: 0,
        caloriesBurnedByRest: 0,
        totalCaloriesBurned: 0,
        totalCaloriesEaten: 0,
        totalProteinsEaten: 0,
        totalCarbsEaten: 0,
        totalFatsEaten: 0,
        waterDrunkToday: 0
    }
});

const minCalories = computed(() => {
    return 10 * (data.user.weight ?? 0) + 6.25 * (data.user.height ?? 0) - 5 * (data.user.age ?? 0) + 5;
})

const map: Map<string, number> = new Map();
map.set('low', 1.2);
map.set('medium', 1.55);
map.set('high', 1.7);
map.set('professional', 1.9);
const toEat = computed(() => {
    return Math.round(minCalories.value * map.get(data.user.activityLevel)!);
});

const proteinGoal = computed(() => {
    return Math.round(1.5 * (data.user.weight ?? 0));
});

const calorieScore = computed(() => {
    return Math.round(report.report.totalCaloriesEaten / toEat.value * 100);
});

const proteinScore = computed(() => {
    return Math.round(report.report.totalProteinsEaten / proteinGoal.value * 100);
});

const water = computed(() => {
    return +(data.user.weight! * 0.033).toFixed(2);
});

const waterScore = computed(() => {
    return Math.round(report.report.waterDrunkToday / water.value * 100);
});
let score = computed(() => {
    return Math.round(
        (calorieScore.value + proteinScore.value + waterScore.value) / 3
    );
});
let color = computed(() => {
    return `color: color-mix(in lab, #ff0000 ${100 - score.value}%, #00ff00 ${score.value}%);`
})
let styles = computed(() => {
    return `width: ${Math.round(score.value)}%; background-${color.value}`
});

onMounted(async () => {
    data.user = (await axios.get('/api/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })).data;
    let res;
    try {
        res = (await axios.get('/api/report', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })).data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                await axios.post('/api/report', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                res = (await axios.get('/api/report', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })).data;
            }
        }
    }

    report.report = res;
})

</script>
<style scoped></style>