<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Email" v-model.trim="email" />
            <input
                type="password"
                placeholder="Password"
                v-model.trim="password"
            />
            <q-btn type="submit" :loading="loading" color="primary"
                >Submit</q-btn
            >
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) {
        return alert('Fill all fields');
    }
    loading.value = true;
    await userStore.loginUser(email.value, password.value);
    loading.value = false;
};
</script>
