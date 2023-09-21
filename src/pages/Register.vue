<template>
    <q-page class="flex justify-center items-center">
        <q-card class="q-pa-md flex column justify-center items-center">
            <h3>Register</h3>
            <q-form @submit.prevent="handleSubmit" class="flex-center">
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

                <q-input type="name" placeholder="Name" v-model.trim="name" />
                <q-input
                    type="phone"
                    placeholder="Phone"
                    v-model.trim="phone"
                />
                <q-btn type="submit">Create user</q-btn>
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
const name = ref('');
const phone = ref();

const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) {
        return alert('Fill in all fields');
    }
    await userStore.registerUser(
        email.value,
        password.value,
        phone.value,
        name.value
    );
};
</script>
