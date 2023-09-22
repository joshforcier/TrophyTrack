<template>
    <q-page class="q-pa-md">
        <Slogan />
        <p class="text-subtitle1 text-center">
            Trophy Track notifies you of application deadlines, tracks your
            bonus/preference points, and recommends tags with the highest odds
            based on your points.
        </p>
        <div class="row justify-evenly">
            <router-link to="/points">
                <q-btn color="primary" label="Track points" />
            </router-link>
            <router-link to="/notifications">
                <q-btn color="primary" label="Notifications" />
            </router-link>
            <!-- <router-link to="/tags">
                <q-btn color="primary" label="Find tags" />
            </router-link> -->
        </div>
    </q-page>
</template>

<script setup lang="ts">
import Slogan from 'components/Slogan.vue';
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
const userStore = useUserStore();
</script>
