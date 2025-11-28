import { MenuOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableProps } from "antd/es/table";
import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    "data-row-key": string;
}

const Row = ({ children, ...props }: RowProps) => {
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id: props["data-row-key"]
    });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 })?.replace(
            /translate3d\(([^,]+),/,
            "translate3d(0,"
        ),
        transition,
        ...(isDragging ? { position: "relative", zIndex: 9999 } : {})
    };

    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if ((child as React.ReactElement).key === "sort") {
                    return React.cloneElement(child as React.ReactElement, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{ touchAction: "none", cursor: "move" }}
                                {...listeners}
                            />
                        )
                    });
                }
                return child;
            })}
        </tr>
    );
};

export enum SortType {
    ASC = "ascending",
    DESC = "descending"
}

const getOrder = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

interface DragSortingTableProps<T> {
    tableProps: Omit<TableProps<T>, "rowKey" | "dataSource" | "pagination" | "components">;
    dataSource: T[];
    modifiedItemList: React.MutableRefObject<
        {
            id: number;
            order: number;
        }[]
    >;
    sort?: SortType;
    orderField?: string;
    step?: number;
    pagination?: {
        pageSize: number;
        currentPage: number;
    };
}

const DragSortingTable = <T extends { id: number; order: number | null }>({
    tableProps,
    dataSource,
    modifiedItemList,
    sort = SortType.DESC,
    orderField = "order",
    step = 100,
    pagination
}: DragSortingTableProps<T>) => {
    const [data, setData] = useState<T[]>(
        dataSource
            .map((item, index) => ({
                ...item,
                orderIndex: (pagination ? (pagination.currentPage - 1) * pagination.pageSize : 0) + index + 1
            }))
            .sort((a, b) => (sort === SortType.DESC ? -1 : 1) * (getOrder(a, orderField) - getOrder(b, orderField)))
    );

    const [dataRowKey, setDataRowKey] = useState<number[]>(data.map((ele) => ele.id));

    const activeId = useRef<number>();

    useEffect(() => {
        if (activeId.current === undefined) return;

        setData((prev) =>
            prev.map((ele) => {
                const index = dataRowKey.findIndex((ele) => ele === activeId.current);
                const beforeOrder = prev[index - 1]
                    ? getOrder(prev[index - 1], orderField)
                    : sort === SortType.DESC
                      ? getOrder(prev[index + 1], orderField) + step
                      : 0;
                const afterOrder = prev[index + 1]
                    ? getOrder(prev[index + 1], orderField)
                    : sort === SortType.DESC
                      ? 0
                      : getOrder(prev[index - 1], orderField) + step;

                const newOrder = (beforeOrder + afterOrder) / 2;

                const newModifiedItemList = [...modifiedItemList.current.filter((ele) => ele.id !== activeId.current)];
                newModifiedItemList.push({
                    id: activeId.current as number,
                    order: newOrder
                });
                modifiedItemList.current = newModifiedItemList;

                return {
                    ...ele,
                    [orderField]: ele.id === activeId.current ? newOrder : getOrder(ele, orderField)
                };
            })
        );
    }, [dataRowKey, modifiedItemList, orderField, sort, step]);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            activeId.current = active.id as number;

            setData((previous) => {
                const activeIndex = previous.findIndex((i) => i.id === active.id);
                const overIndex = previous.findIndex((i) => i.id === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
            setDataRowKey((previous) => {
                const activeIndex = previous.findIndex((i) => i === active.id);
                const overIndex = previous.findIndex((i) => i === over?.id);
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
                // rowKey array
                items={data.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
            >
                <Table
                    components={{
                        body: {
                            row: Row
                        }
                    }}
                    rowKey="id"
                    pagination={false}
                    bordered
                    dataSource={data}
                    columns={[...(tableProps.columns ?? [])]}
                    {...tableProps}
                />
            </SortableContext>
        </DndContext>
    );
};

export default DragSortingTable;
