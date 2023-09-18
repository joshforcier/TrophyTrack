import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTableDataStore = defineStore('tableData', () => {
    // State
    const selectedStates = ref<string[]>([]);
    const selectedSpecies = ref<string[]>([]);
    const stateNotifications = ref<StateData>({
        wyoming: {
            elk: {
                notifications: [
                    {
                        name: 'Resident',
                        id: 'wyoming_elk_resident',
                        deadline: new Date(),
                    },
                    {
                        name: 'Nonresident',
                        id: 'wyoming_elk_nonresident',
                        deadline: new Date(),
                    },
                    {
                        name: 'Nonresident preference point',
                        id: 'wyoming_elk_nonresident_preference_point',
                        deadline: new Date(),
                    },
                    {
                        name: 'Supertag',
                        id: 'wyoming_elk_supertag',
                        deadline: new Date(),
                    },
                ],
            },
        },
    });
    const userNotifications = ref<string[]>([]);
    const userPoints = ref<StateData>({});

    // Actions
    const getUserNotifications = async () => {
        userNotifications.value = [
            'wyoming_elk_nonresident',
            'wyoming_elk_nonresident_preference_point',
        ];
    };

    const getUserPoints = async () => {
        userPoints.value = {
            wyoming: {
                elk: {
                    bonus: 0,
                    preference: 0,
                },
                'mule deer': {
                    bonus: 0,
                    preference: 1,
                },
            },
            montana: {
                elk: {
                    bonus: 3,
                    preference: 2,
                },
                'mule deer': {
                    bonus: 0,
                    preference: 0,
                },
            },
        };
    };

    const getStateNotifications = async () => {
        stateNotifications.value = {
            wyoming: {
                elk: {
                    notifications: [
                        {
                            name: 'Resident',
                            id: 'wyoming_elk_resident',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident',
                            id: 'wyoming_elk_nonresident',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident preference point',
                            id: 'wyoming_elk_nonresident_preference_point',
                            deadline: new Date(),
                        },
                        {
                            name: 'Supertag',
                            id: 'wyoming_elk_supertag',
                            deadline: new Date(),
                        },
                    ],
                },
                'mule deer': {
                    notifications: [
                        {
                            name: 'Tag',
                            id: 'wyoming_mule',
                            deadline: new Date(),
                        },
                        {
                            name: 'Supertag',
                            id: 'wyoming_mule_supertag',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident preference point',
                            id: 'wyoming_mule_nonresident',
                            deadline: new Date(),
                        },
                    ],
                },
            },
            montana: {
                elk: {
                    notifications: [
                        {
                            name: 'B License',
                            id: 'montana_elk_b_license',
                            deadline: new Date(),
                        },
                        {
                            name: 'Bonus point',
                            id: 'montana_elk_bonus_point',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident combo',
                            id: 'montana_elk_nonresident_combo',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident combo preference point',
                            id: 'montana_elk_nonresident_combo_preference_point',
                            deadline: new Date(),
                        },
                        {
                            name: 'Special drawing',
                            id: 'montana_elk_special_drawing',
                            deadline: new Date(),
                        },
                        {
                            name: 'Supertag',
                            id: 'montana_elk_supertag',
                            deadline: new Date(),
                        },
                    ],
                },
                'mule deer': {
                    notifications: [
                        {
                            name: 'B License',
                            id: 'montana_mule_b_license',
                            deadline: new Date(),
                        },
                        {
                            name: 'Bonus point',
                            id: 'montana_mule_bonus_point',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident combo',
                            id: 'montana_mule_nonresident_combo',
                            deadline: new Date(),
                        },
                        {
                            name: 'Nonresident combo preference point',
                            id: 'montana_mule_nonresident_combo_preference_point',
                            deadline: new Date(),
                        },
                        {
                            name: 'Special drawing',
                            id: 'montana_mule_special_drawing',
                            deadline: new Date(),
                        },
                        {
                            name: 'Supertag',
                            id: 'montana_mule_supertag',
                            deadline: new Date(),
                        },
                    ],
                },
            },
        };
    };

    // const updateNotify = (
    //     stateName: string,
    //     speciesName: string,
    //     notificationName: string,
    //     newNotifyValue: boolean
    // ) => {
    //     const speciesData =
    //         stateNotifications.value[stateName.toLowerCase()][
    //             speciesName.toLowerCase()
    //         ];
    //     if (speciesData) {
    //         const notification = speciesData.notifications.find(
    //             (n) => n.name === notificationName
    //         );
    //         if (notification) {
    //             notification.notify = newNotifyValue;
    //         }
    //     }
    // };

    return {
        selectedStates,
        selectedSpecies,
        stateNotifications,
        userNotifications,
        userPoints,
        getUserNotifications,
        getUserPoints,
        getStateNotifications,
        // updateNotify,
    };
});

interface Notification {
    name: string;
    id: string;
    deadline: Date;
}

interface SpeciesData {
    bonus?: number;
    preference?: number;
    notifications?: Notification[];
}

// Nested dynamic keys for species inside each state
interface StateData {
    [state: string]: {
        [species: string]: SpeciesData;
    };
}
