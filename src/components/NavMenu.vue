<template>
    <q-drawer :model-value="leftDrawerOpen" show-if-above bordered>
        <q-list>
            <q-item-label header></q-item-label>

            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
            />
        </q-list>

        <q-btn-group square spread class="fixed-bottom">
            <q-btn
                @click="userStore.logoutUser"
                v-if="userStore.userData"
                color="secondary"
            >
                Logout
            </q-btn>

            <q-btn to="/login" v-if="!userStore.userData" color="primary">
                Login
            </q-btn>
            <q-btn to="/register" v-if="!userStore.userData" color="primary">
                Register
            </q-btn>
        </q-btn-group>
    </q-drawer>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';

import EssentialLink, {
    EssentialLinkProps,
} from 'components/EssentialLink.vue';

const props = defineProps({
    leftDrawerOpen: {
        type: Boolean,
        default: false,
    },
});

const userStore = useUserStore();

const essentialLinks: EssentialLinkProps[] = [
    {
        title: 'How it works',
        caption: '',
        icon: 'o_help_center',
        link: '/howitworks',
    },
    {
        title: 'Notifications',
        caption: '',
        icon: 'o_feedback',
        link: '/notifications',
    },
    {
        title: 'Track points',
        caption: '',
        icon: 'o_assessment',
        link: '/points',
    },
    // {
    //     title: 'Find tags',
    //     caption: '',
    //     icon: 'o_help_center',
    //     link: '/tags',
    // },
    {
        title: 'My account',
        caption: '',
        icon: 'o_account_box',
        link: '/account',
    },
    {
        title: 'Contact us',
        caption: '',
        icon: 'o_email',
        link: '/contact',
    },
];
</script>
