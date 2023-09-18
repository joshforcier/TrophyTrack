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
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
            <q-item-label header></q-item-label>

            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
            />
        </q-list>
        <q-btn
            @click="userStore.logoutUser"
            v-if="userStore.userData"
            color="secondary"
        >
            Logout
        </q-btn>
    </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '../stores/user';

import EssentialLink, {
    EssentialLinkProps,
} from 'components/EssentialLink.vue';

const userStore = useUserStore();

const essentialLinks: EssentialLinkProps[] = [
    {
        title: 'How it works',
        caption: '',
        icon: 'o_help_center',
        link: '/howitworks',
    },
    {
        title: 'Track points',
        caption: '',
        icon: 'o_help_center',
        link: '/points',
    },
    {
        title: 'Notifications',
        caption: '',
        icon: 'o_help_center',
        link: '/notifications',
    },
    {
        title: 'My account',
        caption: '',
        icon: 'o_account',
        link: '/account',
    },
    {
        title: 'Register',
        caption: '',
        icon: 'o_account',
        link: '/register',
    },
    {
        title: 'Contact us',
        caption: '',
        icon: 'o_email',
        link: '/contact',
    },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

const $q = useQuasar();
$q.dark.isActive = userStore.userProfile.isDark;
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

// const isLoggedIn = ref(false);
// // runs after firebase is initialized
// auth.onAuthStateChanged(function (user) {
//     if (user) {
//         isLoggedIn.value = true; // if we have a user
//     } else {
//         isLoggedIn.value = false; // if we do not
//     }
// });
</script>
