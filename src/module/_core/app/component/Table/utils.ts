import { OrderQuery } from "module/_core/infras/config/type/sortQuery";
import { SortOrder, SorterResult } from "antd/es/table/interface";

// get sort order from query
export const getColumnSortOrder = (
    sort: string | undefined,
    order: OrderQuery | undefined,
    field: string
): SortOrder => {
    if (sort !== field) return null;

    if (order == OrderQuery.ASC) return "ascend";
    else if (order == OrderQuery.DESC) return "descend";
    else return null;
};

interface HandleSortOptions {
    sorter: SorterResult<any> | SorterResult<any>[];
    handleOrderChange: (field: string, order: SortOrder) => void;
    handleCancelSort: () => void;
}

// change url when sort button is triggered
export const handleSort = ({ sorter, handleOrderChange, handleCancelSort }: HandleSortOptions) => {
    const { field, order } = sorter as SorterResult<any>;

    if (order !== undefined) handleOrderChange(field as string, order);
    else handleCancelSort();
};

export const getSortQuery = <T>(field: string, order: SortOrder) => {
    return `${order == "ascend" ? "" : "-"}${field}` as T;
};
