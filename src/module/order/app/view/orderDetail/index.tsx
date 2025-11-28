import { EditOutlined } from "@ant-design/icons";
import Block from "@module/_core/app/component/Block";

const OrderDetailView = () => {
  return (
    <div className="px-4.5">
      <div className="lap:flex gap-6.5">
        <Block className="!flex flex-col gap-2">
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Mã đơn hàng</div>
            <div className="font-medium text-[#183348]">#MAPNO01</div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Trạng thái đơn hàng</div>
            <div className="flex gap-6">
              <div className="bg-[#CFD4D8]">Đã thanh toán</div>
              <EditOutlined />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Thời gian đặt hàng</div>
            <div className="font-medium text-[#183348]">01/10/2025</div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Mã QR</div>
            <div className="font-medium text-[#183348]">01/10/2025</div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Danh sách khóa học</div>
            <div className="font-medium text-[#183348]">01/10/2025</div>
          </div>
        </Block>
        <Block className="flex-1"></Block>
      </div>
    </div>
  );
};

export default OrderDetailView;
