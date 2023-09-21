<template>
    <q-layout>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { watch, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const $q = useQuasar();

onBeforeMount(() => {
    if (userStore.loadingAuth || userStore.loadingUser) {
        console.log('test');
        $q.loading.show({
            delay: 400, // ms
        });
    }
});

watch(
    () => userStore.loadingAuth,
    (newLoadingState, oldLoadingState) => {
        if (newLoadingState) {
            $q.loading.show({
                delay: 400, // ms
            });
        } else {
            $q.loading.hide();
        }
    }
);
</script>

<style>
a {
    all: unset;
}
</style>
