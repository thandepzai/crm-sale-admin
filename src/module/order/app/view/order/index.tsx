import Block from "@module/_core/app/component/Block";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { TrashIcon } from "@module/_core/app/icon/TrashIcon";

const OrderView = () => {
  return (
    <Block className="mt-6.5 mx-4.5 mb-11">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <Button type="primary" className="h-[40px]! w-[120px]">
            Tìm kiếm
          </Button>
        </div>
        <div className="flex gap-5.5">
          <Button type="default" className="h-[40px]! w-[138px]">
            <div className="flex gap-3 items-center">
              <DownloadOutlined className="-rotate-90" />
              <span>Xuất dữ liệu</span>
            </div>
          </Button>
          <Button type="default" className="h-[40px]! w-[150px]">
            <div className="flex gap-3 items-center">
              <TrashIcon className="size-5" color="#333333" />
              <span>Xoá đơn hàng</span>
            </div>
          </Button>
          <Button type="primary" className="h-[40px]! w-[150px]">
            <div className="flex gap-3 items-center">
              <PlusOutlined className="text-white font-bold text-lg"/>
              <span>Tạo đơn hàng</span>
            </div>
          </Button>
        </div>
      </div>
    </Block>
  );
};

export default OrderView;
