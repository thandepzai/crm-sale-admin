"use client";
import {
  LogoutOutlined,
  CaretRightOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { AuthService } from "module/auth/domain/service/auth";
import { MeService } from "module/auth/domain/service/me";
import { Dropdown, Input, Layout } from "antd";
import React, { ReactNode, useState } from "react";
import { HeaderService } from "./service";
import Link from "next/link";
import {
  closeLoadingOverlay,
  openLoadingOverlay,
} from "../../component/Loading/LoadingOverlay";
import { useWindowSize } from "@lib/hook/useWindowSize";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface MainHeaderProps {
  isSiderCollapsed: boolean;
  setIsSiderCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  customContent?: ReactNode;
}

const MainHeader = ({
  isSiderCollapsed,
  setIsSiderCollapsed,
  customContent,
}: MainHeaderProps) => {
  const pathname = usePathname();
  const [valueSearch, setValueSearch] = useState("");
  const { deviceType } = useWindowSize();
  const { logoutMutation } = AuthService.useAuthAction();
  const { data: dataHeader } = HeaderService.useHeader();
  const { data } = MeService.useMe();

  return (
    <Layout.Header
      className={clsx(
        "h-16 px-8 flex items-center justify-between border-b-[1px]",
        pathname === "/" ? "bg-[#eff2f6]" : "bg-white"
      )}
    >
      <div
        className="fixed top-3.5 w-8 h-8 inset-y-auto text-base text-white bg-[#588FC8] hover:bg-[#5484b9] z-50 rounded-full cursor-pointer duration-100"
        style={{
          left: isSiderCollapsed
            ? deviceType !== "mobile"
              ? "calc(80px - 1rem)"
              : "0.5rem"
            : "calc(270px - 1rem)",
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
          rotate: isSiderCollapsed ? "" : "180deg",
        }}
        onClick={() => setIsSiderCollapsed(!isSiderCollapsed)}
      >
        <CaretRightOutlined />
      </div>
      <div className="pl-4 flex items-center">
        {dataHeader.linkBack ? (
          <Link href={dataHeader.linkBack} className="text-primary! mr-2">
            <ArrowLeftOutlined />
          </Link>
        ) : null}
        <div className="block-heading text-base! tab:!text-xl line-clamp-2">
          {dataHeader.title}
        </div>
      </div>
      {dataHeader.onSearch && (
        <div className="flex bg-[#f2f5f9] px-3 rounded-lg w-[30%]">
          <Input
            onChange={(value) => setValueSearch(value.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                dataHeader.onSearch!(valueSearch);
              }
            }}
          />
          <div
            className="cursor-pointer"
            onClick={() => dataHeader.onSearch!(valueSearch)}
          >
            <SearchOutlined />
          </div>
        </div>
      )}
      <div>{customContent}</div>
      <div className="flex items-center gap-2">
        <Dropdown
          menu={{
            items: [
              {
                key: "logout",
                label: (
                  <div
                    className="flex items-center gap-2"
                    onClick={() => {
                      openLoadingOverlay("Đang đăng xuất...");
                      logoutMutation.mutate(undefined, {
                        onSuccess: () => closeLoadingOverlay(),
                      });
                    }}
                  >
                    <LogoutOutlined className="text-red-500" />
                    <span className="text-red-500">Đăng xuất</span>
                  </div>
                ),
              },
            ],
          }}
        >
          <div className=" h-12 py-1 pl-1 pr-3 border border-[#ccc] rounded-full flex items-center gap-2 cursor-pointer">
            <img
              className="max-w-[30px] aspect-square rounded-full"
              src={data?.avatar}
              alt=""
            />
            <span className="hidden lap:block text-[#333333] font-medium">
              {data?.username}
            </span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default MainHeader;
