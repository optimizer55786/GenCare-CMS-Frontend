export interface CategoryDataType {
    day: string;
    category: string;
    background_color: string;
    column_number: number;
    number_days: 1;
    empty: false;
}

export interface MockDataType {
    order: number;
    data: CategoryDataType[];
}
