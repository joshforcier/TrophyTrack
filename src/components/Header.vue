<template>
    <q-header elevated>
        <q-toolbar class="d-flex">
            <q-btn
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="toggleLeftDrawer"
            />

            <q-toolbar-title class="text-uppercase font-raleway">
                <router-link to="/"><span>Trophy track</span></router-link>
            </q-toolbar-title>

            <q-toggle v-model="isDark" color="white" :label="label" />
        </q-toolbar>
    </q-header>
    <NavMenu
        :left-drawer-open="leftDrawerOpen"
        @update:model-value="leftDrawerOpen = $event"
    />
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '../stores/user';
import NavMenu from './NavMenu.vue';

const userStore = useUserStore();

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

const $q = useQuasar();
$q.dark.isActive = userStore.userProfile?.isDark ?? false;
const isDark = ref($q.dark.isActive);
$q.dark.set(isDark.value);
watch(
    () => isDark.value,
    (val) => {
        $q.dark.set(val);
        userStore.updateUserIsDark(val);
    }
);

const label = computed(() => (isDark.value ? 'Dark' : 'Light'));
</script>
