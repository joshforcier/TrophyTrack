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
                            v-model="stateSpeciesDataStore.selectedStates"
                            multiple
                            :options="stateSpeciesDataStore.allStates"
                            use-chips
                            stack-label
                            dense
                            label="States"
                            behavior="menu"
                            style="width: 100px"
                            class="q-mr-xs"
                        />

                        <q-select
                            v-model="stateSpeciesDataStore.selectedSpecies"
                            multiple
                            :options="stateSpeciesDataStore.allSpecies"
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
                            (val) => updateNotify(props.row.id, val)
                        "
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-bonus="props">
                <q-td :props="props"
                    ><q-input v-model="props.row.bonus" dense></q-input
                ></q-td>
            </template>
            <template v-slot:body-cell-preference="props">
                <q-td :props="props"
                    ><q-input v-model="props.row.preference" dense></q-input
                ></q-td>
            </template>
        </q-table>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStateSpeciesDataStore } from '../stores/stateSpeciesData';
import { RowType, ColumnType } from '../types/types';

const stateSpeciesDataStore = useStateSpeciesDataStore();

const loading = ref(true);
const userNotifications = ref<string[]>([]);
setTimeout(() => {
    stateSpeciesDataStore.getUserNotifications();
    userNotifications.value = stateSpeciesDataStore.userNotifications;
    stateSpeciesDataStore.getStateNotifications();
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

const emits = defineEmits(['update:notify']);

watch(
    () => stateSpeciesDataStore.stateNotifications,
    () => {
        stateSpeciesDataStore.allSpecies;
        stateSpeciesDataStore.allStates;
    },
    { deep: true }
);

const saving = ref(false);
async function save() {
    saving.value = true;
    setTimeout(() => {
        alert('TODO');
        // updateUserNotifications(userNotifications.value)
        saving.value = false;
    }, 1000);
}

function updateNotify(rowId: string, value: boolean) {
    emits('update:notify', { rowId, value });
}
</script>
