<template>
    <div class="q-pa-md">
        <q-table
            class="sticky-header-table"
            :rows="rows"
            :columns="columns"
            :loading="loading"
            row-key="id"
            dense
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            :pagination="paginationOptions"
        >
            <template v-slot:top>
                <div class="q-table__title">{{ title }}</div>
                <div class="flex column q-mb-md" style="width: 100%">
                    <div class="flex justify-between">
                        <q-select
                            v-model="tableDataStore.selectedStates"
                            multiple
                            :options="states"
                            use-chips
                            stack-label
                            dense
                            label="States"
                            behavior="menu"
                            style="width: 100px"
                            class="q-mr-xs"
                        />

                        <q-select
                            v-model="tableDataStore.selectedSpecies"
                            multiple
                            :options="species"
                            use-chips
                            stack-label
                            dense
                            label="Species"
                            behavior="menu"
                            style="width: 100px"
                        />
                        <q-btn
                            round
                            color="primary"
                            icon="save"
                            @click="save"
                            :loading="saving"
                        />
                    </div>
                </div>
            </template>
            <template v-slot:body-cell-notify="props">
                <q-td :props="props">
                    <q-checkbox
                        :modelValue="props.row.notify"
                        @update:modelValue="
                            (val) =>
                                updateNotifyValue(
                                    props.row.state,
                                    props.row.species,
                                    props.row.notificationName,
                                    val
                                )
                        "
                    />
                  
                </q-td>
            </template>
            <template v-slot:body-cell-bonus="props">
                <q-td :props="props"><q-input v-model="props.row.bonus" dense></q-input></q-td>
            </template>
            <template v-slot:body-cell-preference="props">
                <q-td :props="props">{{ props.row.preference }}</q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTableDataStore } from '../stores/tableData';
import { capitalizeEachWord } from '../composables/useCapitalize';

interface RowType {
    id: string;
    state: string;
    species: string;
    notificationName: string;
    notify: boolean;
}

interface ColumnType {
    name: string;
    label: string;
    field: string | ((row: any) => any);
    required?: boolean;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    sort?: ((a: any, b: any, rowA: any, rowB: any) => number);
}

const tableDataStore = useTableDataStore();

const loading = ref(true);
setTimeout(() => {
    tableDataStore.getUserNotifications();
    tableDataStore.getStateNotifications();
    loading.value = false;
}, 2000);

const paginationOptions = ref({
    rowsPerPage: 10, // Set the default rows per page
});

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    columns: {
        type: Array as () => ColumnType[],
        required: true,
        default: () => [],
    },
    rows: {
        type: Array as () => RowType[],
        required: true,
        default: () => [],
    },
});

const species = computed(() => {
    const speciesList: string[] = [];
    if (!tableDataStore.stateNotifications) return [];

    for (const stateKey in tableDataStore.stateNotifications) {
        const speciesInState = tableDataStore.stateNotifications[stateKey];

        for (const speciesKey in speciesInState) {
            speciesList.push(capitalizeEachWord(speciesKey));
        }
    }

    return [...new Set(speciesList)];
});
const states = computed(() => {
    if (!tableDataStore.stateNotifications) return [];
    return [...new Set(Object.keys(tableDataStore.stateNotifications))]
        .map((st) => capitalizeEachWord(st))
        .sort();
});

watch(
    () => tableDataStore.stateNotifications, // Wrap it in a function
    () => {
        species.value;
        states.value;
    },
    { deep: true }
);

function updateNotifyValue(
    state: string,
    species: string,
    name: string,
    newValue: boolean
) {
    // tableDataStore.updateNotify(state, species, name, newValue);
}

const saving = ref(false);
async function save() {
    saving.value = true;
    setTimeout(() => {
        alert('TODO');
        saving.value = false;
    }, 1000);
}
</script>
