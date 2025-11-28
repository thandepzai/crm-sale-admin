import { Pagination, PaginationProps } from "antd";

interface QueryPaginationProps extends Pick<PaginationProps, "total" | "pageSize" | "current"> {
    className?: string;
    onPageChange: (newPage: number) => void;
}

const QueryPagination = ({ total, pageSize, current, className, onPageChange }: QueryPaginationProps) => {
    if (pageSize === undefined) return null;

    return (
        <div className={`${className} mt-6 mb-2 flex-center`}>
            <Pagination
                total={total}
                pageSize={pageSize}
                current={current}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
};

export default QueryPagination;
