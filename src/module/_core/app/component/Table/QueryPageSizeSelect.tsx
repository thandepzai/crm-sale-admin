import { Select } from "antd";
import { memo } from "react";

interface QueryPageSizeSelectProps {
    value: number | undefined;
    pageSizeOptions: number[];
    onPageSizeChange: (newPageSize: number) => void;
}

const QueryPageSizeSelect = ({ value, pageSizeOptions, onPageSizeChange }: QueryPageSizeSelectProps) => {
    // console.log("QueryPageSizeSelect");

    return (
        <div className="flex-center gap-2">
            <span>Hiển thị</span>
            <Select
                value={value}
                options={pageSizeOptions.map((option: any) => ({ value: option }))}
                onChange={onPageSizeChange}
            />
            <span>kết quả</span>
        </div>
    );
};

export default memo(QueryPageSizeSelect);
