<template>
    <router-link :to="link">
        <q-item>
            <q-item-section v-if="icon" avatar>
                <q-icon :name="icon" />
            </q-item-section>

            <q-item-section>
                <q-item-label class="text-h6">{{ title }}</q-item-label>
                <q-item-label caption>{{ caption }}</q-item-label>
            </q-item-section>
        </q-item>
    </router-link>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
    title: string;
    caption?: string;
    link?: string;
    icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
    caption: '',
    link: '#',
    icon: '',
});
</script>
