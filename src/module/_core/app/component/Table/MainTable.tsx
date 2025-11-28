import { Table, TableProps } from "antd";
import { AppLoadingIcon } from "../Loading/AppLoading";

interface MainTableProps<T> extends TableProps<T> {
    loading?: boolean;
}

const MainTable = <T extends object>(props: MainTableProps<T>) => {
    return (
        <Table
            pagination={{
                showSizeChanger: false,
                pageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`
            }}
            bordered
            {...props}
            loading={{
                indicator: <AppLoadingIcon title="Đang tải..." />,
                spinning: !!props.loading,
                rootClassName: "!max-h-[70vh] !flex justify-center items-center"
            }}
        />
    );
};

export default MainTable;
