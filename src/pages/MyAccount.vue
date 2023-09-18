<template>
    <q-page padding>
        <q-input v-model="name" label="First name"></q-input>
        <q-input v-model="email" label="Email" required></q-input>
        <q-input v-model="phone" label="Phone" required></q-input>

        <span>Notify me by:</span>
        <q-checkbox v-model="notifyMeBy.text" label="Text"></q-checkbox>
        <q-checkbox v-model="notifyMeBy.email" label="Email"></q-checkbox>
        <br />
        <q-btn @click="update" color="primary">Save</q-btn>
    </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useUserStore } from '../stores/user';
import { auth } from '../boot/firebase';

const userStore = useUserStore();

const name = ref();
const email = ref();
const phone = ref();
const notifyMeBy = ref({
    text: false,
    email: false,
});
onBeforeMount(async () => {
    if (userStore.userProfile) {
        name.value = userStore.userProfile.displayName;
        email.value = userStore.userProfile.email;
        phone.value = userStore.userProfile.phone;
        notifyMeBy.value.text = userStore.userProfile.notifyMeBy.text;
        notifyMeBy.value.email = userStore.userProfile.notifyMeBy.email;
    }
});
// Watch for changes in userProfile and update the form fields
watch(
    () => userStore.userProfile,
    (newUserProfile) => {
        name.value = newUserProfile.displayName;
        email.value = newUserProfile.email;
        phone.value = newUserProfile.phone;
        notifyMeBy.value.text = newUserProfile.notifyMeBy.text;
        notifyMeBy.value.email = newUserProfile.notifyMeBy.email;
    }
);

function update() {
    userStore.updateUserData(
        name.value,
        email.value,
        phone.value,
        notifyMeBy.value
    );
}
</script>
