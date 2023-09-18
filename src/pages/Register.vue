<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Email" v-model.trim="email" />
            <input
                type="password"
                placeholder="Password"
                v-model.trim="password"
            />

            <input type="name" placeholder="Name" v-model.trim="name" />
            <input type="phone" placeholder="Phone" v-model.trim="phone" />
            <button type="submit">Create user</button>
        </form>
    </div>
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
