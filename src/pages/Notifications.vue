<template>
    <q-page>
        <BaseTable
            title="Notifications"
            :rows="rows"
            :columns="columns"
            @update:notify="handleNotifyUpdate"
        />
        <q-btn @click="stateSpeciesDataStore.getStateNotifications"></q-btn>
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { capitalizeEachWord } from '../composables/useCapitalize';
import BaseTable from '../components/BaseTable.vue';
import { useStateSpeciesDataStore } from '../stores/stateSpeciesData';
import { StateData } from '../types/types';

const stateSpeciesDataStore = useStateSpeciesDataStore();
stateSpeciesDataStore.getStateNotifications();

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
        name: 'notify',
        align: 'center',
        label: 'Notify',
        field: 'notify',
        sortable: true,
    },
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
        name: 'notificationName',
        align: 'left',
        label: 'Type',
        field: 'notificationName',
        sortable: true,
    },
]);

const shouldReturnAll = computed(() => {
    return (
        (!stateSpeciesDataStore.selectedStates ||
            stateSpeciesDataStore.selectedStates.length === 0) &&
        (!stateSpeciesDataStore.selectedSpecies ||
            stateSpeciesDataStore.selectedSpecies.length === 0)
    );
});
const isStateSelected = (state: string): boolean => {
    return (
        shouldReturnAll.value ||
        !stateSpeciesDataStore.selectedStates ||
        stateSpeciesDataStore.selectedStates.length === 0 ||
        stateSpeciesDataStore.selectedStates.includes(capitalizeEachWord(state))
    );
};
const isSpeciesSelected = (species: string): boolean => {
    return (
        shouldReturnAll.value ||
        !stateSpeciesDataStore.selectedSpecies ||
        stateSpeciesDataStore.selectedSpecies.length === 0 ||
        stateSpeciesDataStore.selectedSpecies.includes(
            capitalizeEachWord(species)
        )
    );
};

const rows = ref();
function formatForId(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '_');
}

function getSortedResults(newStateNotifications: StateData) {
    return Object.entries(newStateNotifications)
        .filter(([state]) => isStateSelected(state))
        .flatMap(([state, speciesData]) =>
            Object.entries(speciesData)
                .filter(([species]) => isSpeciesSelected(species))
                .flatMap(([species, { notifications }]) =>
                    notifications?.map((notification) => {
                        const id = `${formatForId(state)}_${formatForId(
                            species
                        )}_${formatForId(notification.name)}`;
                        return {
                            id,
                            state: capitalizeEachWord(state),
                            species: capitalizeEachWord(species),
                            notificationName: notification.name,
                            notify: stateSpeciesDataStore.userNotifications.includes(
                                id
                            ),
                        };
                    })
                )
        )
        .sort(
            (a, b) =>
                a.state.localeCompare(b.state) ||
                a.species.localeCompare(b.species) ||
                a.notificationName.localeCompare(b.notificationName)
        );
}

watch(
    () => stateSpeciesDataStore.stateNotifications,
    (newStateNotifications) => {
        rows.value = getSortedResults(newStateNotifications);
    },
    { deep: true }
);

function handleNotifyUpdate({
    rowId,
    value,
}: {
    rowId: string;
    value: boolean;
}) {
    const rowIndex = rows.value.findIndex((r) => r.id === rowId);
    if (rowIndex !== -1) {
        rows.value[rowIndex].notify = value;
    }
}
</script>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  height: 100%

  .q-table__top,
  .q-table__bottom,

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0


  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
