"use client";

import { EditOutlined } from "@ant-design/icons";
import Block from "@module/_core/app/component/Block";
import MainTable from "@module/_core/app/component/Table/MainTable";
import { ColumnsType } from "antd/es/table";
import { OrderDetailData } from "./orderDetailData";


const OrderDetailView = () => {
  const columns: ColumnsType = [
    {
      title: "Mã học viên",
      align: "center",
      dataIndex: "id",
      render: (value) => <div className="font-medium text-center">{value}</div>,
    },
    {
      title: "Tên học viên/ Khách hàng",
      align: "center",
      dataIndex: "name",
      render: (value) => <div className="font-medium text-center">{value}</div>,
    },
    {
      title: "Khoá học",
      align: "center",
      dataIndex: "course",
      render: (value) => (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <div
              key={item}
              className="border border-[#EAEBED] rounded-lg px-2 py-1"
            >
              {item}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Giá bán",
      align: "center",
      dataIndex: "price",
    },
    {
      title: "Ưu đãi",
      align: "center",
      dataIndex: "sale",
    },
    {
      title: "Thành tiền",
      align: "center",
      dataIndex: "total",
    },
  ];

  return (
    <div className="px-4.5">
      <div className="lap:flex gap-6.5">
        <Block className="flex! flex-col gap-2">
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Mã đơn hàng</div>
            <div className="font-medium text-[#183348]">#MAPNO01</div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Trạng thái đơn hàng</div>
            <div className="flex gap-6">
              <div className="bg-[#CFD4D8] w-[120px] h-8 flex-center rounded-lg">
                Đã thanh toán
              </div>
              <EditOutlined />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Thời gian đặt hàng</div>
            <div className="font-medium text-[#183348]">01/10/2025</div>
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Mã QR</div>
            <img
              src="https://admin.mapxdev.com/images/logo-128.png"
              alt=""
              className="size-[127px]"
            />
          </div>
          <div className="flex gap-6">
            <div className="w-[200px] text-[#626C90]">Danh sách khóa học</div>
            <div className="font-medium text-[#183348]">01/10/2025</div>
          </div>
        </Block>
        <Block className="flex-1">
          <MainTable
            dataSource={OrderDetailData}
            columns={columns}
            rowKey="id"
            // scroll={{ x: "max-content" }}
            pagination={false}
          />
        </Block>
      </div>
    </div>
  );
};

export default OrderDetailView;
