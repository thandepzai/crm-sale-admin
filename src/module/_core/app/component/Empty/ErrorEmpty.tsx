import { Empty } from "antd";

const ErrorEmpty = () => {
    return (
        <div className="my-[32px] text-center">
            <Empty
                image="/images/error.png"
                imageStyle={{ height: 40, display: "flex", justifyContent: "center" }}
                description={<span className="text-ant-error">Có lỗi xảy ra</span>}
            />
        </div>
    );
};

export default ErrorEmpty;
