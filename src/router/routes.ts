import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/user';
import { auth } from '../boot/firebase';

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser();
    console.log(user);
    if (userStore.userData && userStore.userData.uid) {
        next();
    } else {
        next('/login');
    }
};

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        // beforeEnter: requireAuth,
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: '/points',
                component: () => import('pages/PointTracker.vue'),
            },
            {
                path: '/notifications',
                component: () => import('pages/Notifications.vue'),
            },
            {
                path: '/account',
                component: () => import('pages/MyAccount.vue'),
            },
        ],
    },
    {
        path: '/register',
        component: () => import('../pages/Register.vue'),
    },
    {
        path: '/login',
        component: () => import('../pages/LogIn.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
