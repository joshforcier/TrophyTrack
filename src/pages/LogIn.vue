<template>
    <q-page class="flex justify-center items-center">
        <q-card class="flex column justify-center items-center">
            <h3>Login</h3>
            <q-form
                @submit.prevent="handleSubmit"
                class="q-pa-md flex column justify-center items-center"
            >
                <q-input
                    type="email"
                    placeholder="Email"
                    v-model.trim="email"
                />
                <q-input
                    type="password"
                    placeholder="Password"
                    v-model.trim="password"
                />
                <q-btn type="submit" :loading="loading" color="primary"
                    >Submit</q-btn
                >
            </q-form>
        </q-card>
    </q-page>
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
