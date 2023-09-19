export interface Notification {
    name: string;
    id: string;
    deadline: Date;
}

export interface SpeciesData {
    bonus?: number;
    preference?: number;
    notifications?: Notification[];
}

// Nested dynamic keys for species inside each state
export interface StateData {
    [state: string]: {
        [species: string]: SpeciesData;
    };
}

export interface RowType {
    id: string;
    state: string;
    species: string;
    notificationName: string;
    notify: boolean;
}

export interface ColumnType {
    name: string;
    label: string;
    field: string | ((row: any) => any);
    required?: boolean;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    sort?: (a: any, b: any, rowA: any, rowB: any) => number;
}
