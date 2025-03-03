<template>
    <main class="flex flex-col justify-between items-stretch min-h-screen py-4 px-8 pb-0">
        <div class="flex flex-col items-stretch justify-start">
            <h1 class="text-4xl text-center font-bold mt-8">Add Food</h1>
            <input type="text" v-model="query" class="input-1 mt-8" placeholder="Search food">
            <button @click="search" class="btn-1 mt-4">Search</button>
            <div @click="open(item.id)" v-for="item in results" class="p-4 mt-8 rounded-lg bg-neutral-300">
                <h2 class="text-lg">{{ item.name }}</h2>
                <h2 class="font-semibold">Category: {{ item.category }}</h2>
                <div v-if="ids.includes(item.id)" class="flex flex-col">
                    <p>Calories: {{ item.calories }}</p>
                    <p>Carbs: {{ item.carbs }}</p>
                    <p>Protein: {{ item.protein }}</p>
                    <p>Fat: {{ item.fat }}</p>
                </div>
            </div>
        </div>
        <NavBar></NavBar>
    </main>
</template>
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import { ref, type Ref } from 'vue';

let query = ref('');
let results: Ref<{
    id: number,
    name: string,
    image: string | null,
    link: string,
    category: string,
    calories?: string,
    carbs?: string,
    fat?: string,
    protein?: string,
}[]> = ref([]);
let ids: Ref<number[]> = ref([]);

const search = async () => {
    const res = await axios.get('/api/food/search', {
        params: {
            q: query.value
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    results.value = res.data;
}

const getCategory = (cat: string) => {
    if (cat === 'Recipes') return 'recipe';
    if (cat === 'Products') return 'product';
    if (cat === 'Simple Foods') return 'product';
    return 'menuItem';
}

const open = async (id: number) => {
    if (ids.value.includes(id)) {
        ids.value = ids.value.filter(el => el !== id);
    } else {
        ids.value.push(id);
        const idx = results.value.findIndex(el => el.id === id);
        if (!results.value[idx].carbs) {
            const cat = getCategory(results.value[idx].category);
            const res = await axios.get(`/api/food/${cat}/${id}/nutrition`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            results.value[idx].calories = res.data.calories;
            results.value[idx].carbs = res.data.carbs;
            results.value[idx].protein = res.data.protein;
            results.value[idx].fat = res.data.fat;
        }
    }
}

</script>
<style scoped></style>