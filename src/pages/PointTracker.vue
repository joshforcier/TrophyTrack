<template>
    <q-page>
        <BaseTable :rows="rows" :columns="columns" />
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { capitalizeEachWord } from '../composables/useCapitalize';
import BaseTable from '../components/BaseTable.vue';
import { useTableDataStore } from '../stores/tableData';

const tableDataStore = useTableDataStore();
tableDataStore.getStateNotifications();
tableDataStore.getUserPoints();

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
        align: 'center',
        label: 'State',
        field: 'state',
        sortable: true,
    },
    {
        name: 'species',
        align: 'center',
        label: 'Species',
        field: 'species',
        sortable: true,
    },
    {
        name: 'bonus',
        align: 'center',
        label: 'Bonus points',
        field: 'bonus',
        sortable: true,
    },
    {
        name: 'preference',
        align: 'center',
        label: 'Preference points',
        field: 'preference',
        sortable: true,
    },
]);

const shouldReturnAll = computed(() => {
    return (
        (!tableDataStore.selectedStates ||
            tableDataStore.selectedStates.length === 0) &&
        (!tableDataStore.selectedSpecies ||
            tableDataStore.selectedSpecies.length === 0)
    );
});
const isStateSelected = (state: string): boolean => {
    return (
        shouldReturnAll.value ||
        !tableDataStore.selectedStates ||
        tableDataStore.selectedStates.length === 0 ||
        tableDataStore.selectedStates.includes(capitalizeEachWord(state))
    );
};
const isSpeciesSelected = (species: string): boolean => {
    return (
        shouldReturnAll.value ||
        !tableDataStore.selectedSpecies ||
        tableDataStore.selectedSpecies.length === 0 ||
        tableDataStore.selectedSpecies.includes(capitalizeEachWord(species))
    );
};

const rows = computed(() => {
    const userPoints = tableDataStore.userPoints;
    if (!userPoints) {
        return [];
    }

    let results = Object.entries(userPoints)?.flatMap(
        ([state, speciesData]) => {
            if (!isStateSelected(state)) return [];

            return Object.entries(speciesData).flatMap(([species, points]) => {
                if (!isSpeciesSelected(species)) return [];

                return generateRow(state, species, points);
            });
        }
    );

    results.sort((a, b) => {
        const stateComparison = a.state.localeCompare(b.state);
        return stateComparison !== 0
            ? stateComparison
            : a.species.localeCompare(b.species);
    });

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
