"use client";
import { CloseOutlined } from "@ant-design/icons";
import Block from "@module/_core/app/component/Block";
import MainForm from "@module/_core/app/component/Form/MainForm";
import strings from "@module/_core/infras/constant/strings";
import {
  Button,
  Card,
  Collapse,
  CollapseProps,
  Form,
  Input,
  Space,
  Switch,
} from "antd";
import { useState } from "react";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CreateOrderView = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["1"]);

  const [infoForm] = Form.useForm();

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="font-medium text-[16px] text-[#36464E] leading-[32px] select-none">
          Thông tin học sinh
        </div>
      ),
      children: (
        <MainForm form={infoForm} name="loginForm" onFinish={() => {}}>
          <div className="px-[16px] py-[8px]">
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index) => (
                    <div key={index} className="grid grid-cols-2 gap-x-[16px]">
                      <Form.Item
                        label={"Học Viên " + (index + 1)}
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Chọn khoá học"
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Chọn khoá học"
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Chọn khoá học"
                        name={[field.name, "name"]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  ))}
                  <Button
                    type="default"
                    onClick={() => add()}
                    className="h-[44px]! w-full!"
                  >
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
          </div>
        </MainForm>
      ),
    },
  ];

  return (
    <Block className="mx-4.5 mb-[40px]">
      <div className="mx-auto mt-6.5">
        <Collapse
          items={items}
          defaultActiveKey={activeKeys}
          onChange={(keys) => setActiveKeys(keys as string[])}
          className="[&>div>.ant-collapse-header]:bg-white! [&>div>.ant-collapse-header]:px-[32px]! [&>div>.ant-collapse-header]:py-[12px]! [&>div>div>.ant-collapse-expand-icon]:hidden! overflow-hidden! rounded-[12px]! border-[#EAEBED]!"
        />
      </div>
      <div className="mt-6 rounded-[12px] border border-[#EAEBED]">
        <div className="border-b border-[#EAEBED] px-[32px] py-[12px] flex items-center gap-[10px]">
          <span>Ghi nhận doanh số cho sale</span>
          <Switch />
        </div>
      </div>
    </Block>
  );
};

export default CreateOrderView;
