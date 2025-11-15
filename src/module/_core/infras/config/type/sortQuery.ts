export enum OrderQuery {
    ASC = 1,
    DESC = -1
}

export type SortQuery<T extends string> = `${"" | "-"}${T}`;
