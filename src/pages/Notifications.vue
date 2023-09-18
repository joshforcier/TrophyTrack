<template>
    <BaseTable title="Notifications" :rows="rows" :columns="columns" />
    <q-btn @click="tableDataStore.getStateNotifications"></q-btn>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { capitalizeEachWord } from '../composables/useCapitalize';
import BaseTable from '../components/BaseTable.vue';
import { useTableDataStore } from '../stores/tableData';

const tableDataStore = useTableDataStore();
tableDataStore.getStateNotifications();

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
    let results = [];

    for (const state in tableDataStore.stateNotifications) {
        if (isStateSelected(state)) {
            for (const species in tableDataStore.stateNotifications[state]) {
                if (isSpeciesSelected(species)) {
                    const notifications = (
                        tableDataStore.stateNotifications as any
                    )[state][species].notifications;
                    for (const notification of notifications) {
                        results.push({
                            id: `${state
                                .toLowerCase()
                                .replace(/\s+/g, '_')}_${species
                                .toLowerCase()
                                .replace(/\s+/g, '_')}_${notification.name
                                .toLowerCase()
                                .replace(/\s+/g, '_')}`,
                            state: capitalizeEachWord(state),
                            species: capitalizeEachWord(species),
                            notificationName: notification.name,
                            notify: notification.notify,
                        });
                    }
                }
            }
        }
    }

    results.sort((a, b) => {
        const stateComparison = a.state.localeCompare(b.state);
        if (stateComparison !== 0) {
            return stateComparison;
        } else {
            const speciesComparison = a.species.localeCompare(b.species);
            if (speciesComparison !== 0) {
                return speciesComparison;
            } else {
                return a.notificationName.localeCompare(b.notificationName);
            }
        }
    });

    return results;
});
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
