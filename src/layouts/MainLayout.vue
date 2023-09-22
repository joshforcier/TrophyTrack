<template>
    <Header />

    <router-view />
    <q-page-sticky position="bottom">
        <q-btn-group square spread class="fixed-bottom">
            <q-btn to="/register" v-if="!userStore.userData" color="primary">
                Register
            </q-btn>
        </q-btn-group>
    </q-page-sticky>
</template>

<script setup lang="ts">
import Header from 'components/Header.vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>
