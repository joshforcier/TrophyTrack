import { defineStore } from 'pinia';
import { ref } from 'vue';
import { StateData } from '../types/types';

export const usePointsStore = defineStore('points', () => {
    // State
    const userPoints = ref<StateData>({});

    // Actions
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

    return {
        userPoints,
        getUserPoints,
    };
});
