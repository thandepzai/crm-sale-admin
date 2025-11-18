"use client";
import {
  LogoutOutlined,
  ArrowLeftOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { AuthService } from "module/auth/domain/service/auth";
import { MeService } from "module/auth/domain/service/me";
import { Dropdown, Layout } from "antd";
import { HeaderService } from "./service";
import Link from "next/link";
import {
  closeLoadingOverlay,
  openLoadingOverlay,
} from "../../component/Loading/LoadingOverlay";
import { BellIcon } from "../../icon/BellIcon";
import { ChevronsIcon } from "../../icon/ChevronsIcon";
import clsx from "clsx";

interface MainHeaderProps {
  isSiderCollapsed: boolean;
  setIsSiderCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainHeader = ({
  isSiderCollapsed,
  setIsSiderCollapsed,
}: MainHeaderProps) => {
  const { logoutMutation } = AuthService.useAuthAction();
  const { data: dataHeader } = HeaderService.useHeader();
  const { data } = MeService.useMe();

  return (
    <Layout.Header className="h-[76px]! px-4.5! flex items-center justify-between bg-white! relative">
      <div
        onClick={() => setIsSiderCollapsed((prev) => !prev)}
        className="size-7 rounded overflow-hidden hover:bg-slate-100 active:bg-slate-200 cursor-pointer absolute left-0.5 tab:hidden"
      >
        <ChevronsIcon
          className={clsx(
            "w-7 h-7 transition-all duration-300",
            isSiderCollapsed ? "-scale-x-100" : ""
          )}
        />
      </div>
      <div className="flex items-center max-tab:ml-3">
        {dataHeader.linkBack ? (
          <Link href={dataHeader.linkBack} className="text-primary! mr-2">
            <ArrowLeftOutlined />
          </Link>
        ) : null}
        <div className="block-heading text-xl! tab:text-[24px]! line-clamp-1 font-medium">
          {dataHeader.title} Đơn hàng
        </div>
      </div>
      <div className="flex items-center gap-6.5">
        <BellIcon color="#626C90" className="text-2xl" />
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
          <div className="flex gap-3.5 items-center cursor-pointer">
            <img
              src="https://admin.mapxdev.com/images/logo-128.png"
              alt=""
              className="size-11 rounded-full"
            />
            <div className="flex flex-col">
              <div className="text-[#36464E] font-medium h-6! flex items-center">
                Name
              </div>
              <div className="text-[#36464E] h-6! flex items-center">
                name@shs.com
              </div>
            </div>
            <div className="size-6 flex-center cursor-pointer rounded-sm hover:bg-gray-100 active:bg-gray-200">
              <DownOutlined />
            </div>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default MainHeader;
