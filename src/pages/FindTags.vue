<template>
    <q-page class="flex justify-center items-center">
        <BaseTable title="Find tags" :rows="rows" :columns="columns" />
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseTable from '../components/BaseTable.vue';
import { capitalizeEachWord } from '../composables/useCapitalize';
import { useStateSpeciesDataStore } from '../stores/stateSpeciesData';
import { usePointsStore } from '../stores/points';

const statePointsStore = usePointsStore();
const stateSpeciesDataStore = useStateSpeciesDataStore();

const columns = ref<
    {
        name: string;
        label: string;
        field: string | ((row: any) => any);
        align?: 'center' | 'left' | 'right';
        sortable?: boolean;
    }[]
>([
    {
        name: 'state',
        align: 'left',
        label: 'State',
        field: 'state',
        sortable: true,
    },
    {
        name: 'species',
        align: 'left',
        label: 'Species',
        field: 'species',
        sortable: true,
    },
    {
        name: 'odds',
        align: 'left',
        label: 'Odds',
        field: 'odds',
        sortable: true,
    },
]);

const rows = computed(() => {
    const userPoints = statePointsStore.userPoints;

    const results = {
        wyoming: {
            elk: {
                points: {
                    0: {
                        unit: 411,
                        appType: {
                            resident: {
                                rifle: {
                                    odds: 8,
                                },
                                archery: {
                                    oods: 99,
                                },
                                antlerless: {
                                    odds: 98,
                                },
                            },
                            nonresident: {
                                rifle: {
                                    odds: 5.5,
                                },
                                archery: {
                                    oods: 23,
                                },
                                antlerless: {
                                    odds: 95,
                                },
                            },
                        },
                    },
                    1: {
                        unit: 411,
                        appType: {
                            resident: {
                                rifle: {
                                    odds: 15,
                                },
                                archery: {
                                    oods: 99,
                                },
                                antlerless: {
                                    odds: 99,
                                },
                            },
                            nonresident: {
                                rifle: {
                                    odds: 11,
                                },
                                archery: {
                                    oods: 41,
                                },
                                antlerless: {
                                    odds: 99,
                                },
                            },
                        },
                    },
                },
            },
            'mule deer': {
                notifications: [
                    {
                        unit: 'Tag',
                        id: 'wyoming_mule',
                        deadline: new Date(),
                    },
                    {
                        unit: 'Supertag',
                        id: 'wyoming_mule_supertag',
                        deadline: new Date(),
                    },
                    {
                        unit: 'Nonresident preference point',
                        id: 'wyoming_mule_nonresident',
                        deadline: new Date(),
                    },
                ],
            },
        },
        // montana: {
        //     elk: {
        //         notifications: [
        //             {
        //                 name: 'B License',
        //                 id: 'montana_elk_b_license',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Bonus point',
        //                 id: 'montana_elk_bonus_point',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Nonresident combo',
        //                 id: 'montana_elk_nonresident_combo',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Nonresident combo preference point',
        //                 id: 'montana_elk_nonresident_combo_preference_point',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Special drawing',
        //                 id: 'montana_elk_special_drawing',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Supertag',
        //                 id: 'montana_elk_supertag',
        //                 deadline: new Date(),
        //             },
        //         ],
        //     },
        //     'mule deer': {
        //         notifications: [
        //             {
        //                 name: 'B License',
        //                 id: 'montana_mule_b_license',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Bonus point',
        //                 id: 'montana_mule_bonus_point',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Nonresident combo',
        //                 id: 'montana_mule_nonresident_combo',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Nonresident combo preference point',
        //                 id: 'montana_mule_nonresident_combo_preference_point',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Special drawing',
        //                 id: 'montana_mule_special_drawing',
        //                 deadline: new Date(),
        //             },
        //             {
        //                 name: 'Supertag',
        //                 id: 'montana_mule_supertag',
        //                 deadline: new Date(),
        //             },
        //         ],
        //     },
        // },
    };
    return results;
});

function generateRow(state, species, points) {
    return {
        id: `${state.toLowerCase()}_${species
            .toLowerCase()
            .replace(/\s+/g, '_')}`,
        state: capitalizeEachWord(state),
        species: capitalizeEachWord(species),
        bonus: points.bonus,
        preference: points.preference,
    };
}
</script>
