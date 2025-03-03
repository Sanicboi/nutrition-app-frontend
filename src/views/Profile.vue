<template>
    <main class="flex flex-col justify-between items-stretch min-h-screen py-4 px-8 pb-0">
        <div class="flex flex-col items-stretch justify-start">
            <h1 class="text-4xl text-center font-bold mt-8">Profile</h1>
            <div class="rounded-lg bg-neutral-200 py-4 px-4 mt-4 flex flex-col">
                <h2 class="text-2xl font-semibold ">Personal data</h2>
                <label for="" class="mt-2 text-xl font-semibold">Weight</label>
                <input v-model.number="data.user.weight" type="text" class="input-1 !bg-white mt-2" placeholder="kg">
                <label for="" class="mt-2 text-xl font-semibold">Height</label>
                <input v-model.number="data.user.height" type="text" class="input-1 !bg-white mt-2" placeholder="cm">
                <label for="" class="mt-2 text-xl font-semibold">Age</label>
                <input v-model.number="data.user.age" type="text" class="input-1 !bg-white mt-2" placeholder="years">
                <label for="" class="mt-2 text-xl font-semibold">Activity level</label>
                <select v-model="data.user.activityLevel" name="" class="input-1 !bg-white mt-2" id="">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="professional">Professional</option>
                </select>
                <button class="btn-1 mt-8 text-center" @click="submit">Save</button>
            </div>
            <div class="rounded-lg bg-neutral-200 py-4 px-4 mt-8 flex flex-col mb-8">
                <h2 class="text-2xl font-semibold ">Computed goals</h2>
                <div v-if="data.user?.filledProfile" class="flex flex-col">
                    <h2 class="text-xl font-semibold mt-2">Calorie goal (to eat): <span>{{ toEat }}</span></h2>
                    <h2 class="text-xl font-semibold mt-2">Calorie goal (to burn): <span>{{ toBurn }}</span></h2>
                    <h2 class="text-xl font-semibold mt-2">Water goal: <span>{{ water }}L</span></h2>
                </div>
            </div>
        </div>
        <NavBar></NavBar>
    </main>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import axios, { AxiosError } from 'axios';
import { computed, onMounted, reactive, type Reactive } from 'vue';
import { useRouter } from 'vue-router';
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

onMounted(async () => {
    data.user = (await axios.get('/api/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })).data;

    if (!data.user.filledProfile) {
        alert("Please fill the profile");
    }
})

const router = useRouter();
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
})
const toBurn = computed(() => {
    return Math.round(toEat.value - minCalories.value);
});

const water = computed(() => {
    return +(data.user.weight! * 0.033).toFixed(2);
});

const submit = async () => {
    try {
        const res = await axios.put('/api/me', {
            age: data.user.age,
            weight: data.user.weight,
            height: data.user.height,
            activityLevel: data.user.activityLevel
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) return await router.push('/login')
        }
    }
}

</script>
<style scoped></style>