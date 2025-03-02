<template>
    <form class="flex flex-col items-center py-16 px-8">
        <img src="/favicon.ico" alt="" width="60px">
        <h1 class="text-4xl font-bold mt-16">Sign up</h1>
        <label for="username" class="text-xl font-normal text-neutral-600 text-left self-stretch mt-6">Username</label>
        <input v-model="username" id="username" class="input-1 mt-2 self-stretch" placeholder="username" type="text">
        <label class="text-xl font-normal text-neutral-600 text-left self-stretch mt-6" for="password">Password</label>
        <input v-model="password" id="password" class="input-1 mt-2 self-stretch" type="password">
        <label class="text-xl font-normal text-neutral-600 text-left self-stretch mt-6" for="confirm">Confirm password</label>
        <input v-model="confirm" id="confirm" class="input-1 mt-2 self-stretch" type="password">
        <button @click="submit" class="btn-1 mt-8 self-stretch">Sign Up</button>
        <p class="text-xl font-normal text-neutral-600 text-left self-stretch mt-10">ALready have an account? <span @click="router.push('/login')" class="text-green-500 font-semibold">Sign in</span></p>
    </form>
</template>
<script setup lang="ts">
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let username = ref('');
let password = ref('');
let confirm = ref('');

const submit = async () => {
    if (password.value !== confirm.value) return alert("passwords do not match");

    try {
        const response: AxiosResponse<{
            token: string
        }> = await axios.post('/api/user', {
            password: password.value,
            username: username.value
        });
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
                return alert("User with this username already exists.")
            }
        }

        return alert("An error occured");
    }

    await router.push('/');
}

</script>
<style scoped>

</style>