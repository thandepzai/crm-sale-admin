"use client";

import { useState } from "react";
import Block from "@module/_core/app/component/Block";
import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Select, Tag } from "antd";
import { TrashIcon } from "@module/_core/app/icon/TrashIcon";
import { ColumnsType } from "antd/es/table";
import MainTable from "@module/_core/app/component/Table/MainTable";
import { OrderData } from "./orderData";
import styles from "./style.module.css";
import { EyeIcon } from "@module/_core/app/icon/EyeIcon";
import { EditIcon } from "@module/_core/app/icon/EditIcon";

const OrderView = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  console.log("🚀 ~ OrderView ~ selectedRowKeys:", selectedRowKeys);

  const columns: ColumnsType = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order",
      onCell: (record) => ({ rowSpan: record.id % 3 === 0 ? 3 : 0 }),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
    },
    {
      title: "Tên học sinh",
      dataIndex: "name",
    },
    {
      title: "Số diện thoại",
      dataIndex: "phone",
    },
    {
      title: "Link Facebook",
      dataIndex: "linkFb",
    },
    {
      title: "Id Facebook",
      dataIndex: "idFb",
    },
    {
      title: "Khoá học",
      dataIndex: "course",
      render: (courses: string[]) => (
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <Tag
              key={course}
              className="h-8! flex-center rounded-lg! text-[#626C90] bg-white!"
            >
              {course}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "260px",
      render: (value) => (
        <div className="flex gap-2">
          <Select
            defaultValue={value}
            options={[
              { value: 0, label: "Chờ thanh toán" },
              { value: 1, label: "Đã thanh toán" },
              { value: 2, label: "Quá hạn" },
              { value: 3, label: "Không xác định" },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Hành động",
      width: "120px",
      align: "center",
      fixed: "right",
      render: (value) => (
        <div className="flex-center gap-3">
          <div className="flex-center size-[23px] rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300">
            <EyeIcon className="w-[18px]" />
          </div>
          <div className="flex-center size-[23px] rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300">
            <EditIcon className="w-[17px]" />
          </div>
          <div className="flex-center size-[23px] rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300">
            <TrashIcon className="w-[18px]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Block className="mt-6.5 mx-4.5 mb-11">
      <div className="flex flex-wrap gap-6 items-center mb-9">
        <div className="flex gap-6 max-tab:flex-wrap">
          <Input
            placeholder="Tìm kiếm mã đơn hàng"
            prefix={<SearchOutlined className="text-xl -mt-0.5" />}
            className="w-[207px]!"
          />
          <DatePicker className="min-w-[185px]" />
          <Button type="primary" className="h-[40px]! w-[120px]">
            Tìm kiếm
          </Button>
        </div>

        <div className="ml-auto flex gap-5.5 max-tab:flex-wrap">
          <Button type="default" className="h-[40px]! w-[138px]">
            <div className="flex gap-3 items-center">
              <DownloadOutlined className="-rotate-90" />
              <span>Xuất dữ liệu</span>
            </div>
          </Button>

          <Button
            type="default"
            className="h-[40px]! w-[150px]"
            disabled={selectedRowKeys.length === 0}
          >
            <div className="flex gap-3 items-center">
              <TrashIcon className="size-5" color="#333333" />
              <span>Xoá đơn hàng</span>
            </div>
          </Button>

          <Button type="primary" className="h-[40px]! w-[150px]">
            <div className="flex gap-3 items-center">
              <PlusOutlined className="text-white font-bold text-lg" />
              <span>Tạo đơn hàng</span>
            </div>
          </Button>
        </div>
      </div>

      <MainTable
        dataSource={OrderData.map((item, index) => ({ ...item, id: index }))}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1500 }}
        rowSelection={{
          onCell: (record) => ({ rowSpan: record.id % 3 === 0 ? 3 : 0 }),
        }}
        pagination={false}
        className={styles.orderTable}
      />
    </Block>
  );
};

export default OrderView;
