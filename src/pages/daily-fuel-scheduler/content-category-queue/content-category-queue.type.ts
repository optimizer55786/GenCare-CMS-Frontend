export type CategoryType = {
    name: string,
    number_items_in_queue: number,
    number_items_disabled: number,
} | undefined;

export type DataType = {
    title: string,
    categories: Array<CategoryType>
}
