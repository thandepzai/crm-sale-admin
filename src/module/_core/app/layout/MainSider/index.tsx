import { AuthService } from "module/auth/domain/service/auth";
import { cleanArray } from "lib/util/functions";
import { Layout, Menu } from "antd";
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import { IMenuItem } from "./data";
import { useWindowSize } from "@lib/hook/useWindowSize";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { ChevronsIcon } from "../../icon/ChevronsIcon";
import clsx from "clsx";
import { ChartIcon } from "../../icon/ChartIcon";
import { OrderIcon } from "../../icon/OrderIcon";
import { TransactionIcon } from "../../icon/TransactionIcon";
import { BoxIcon } from "../../icon/BoxIcon";
import { StudentIcon } from "../../icon/StudentIcon";
import { SettingIcon } from "../../icon/SettingIcon";
import { ChatIcon } from "../../icon/ChatIcon";

interface MainSiderProps {
  isSiderCollapsed: boolean;
  setIsSiderCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const MainSider = ({
  isSiderCollapsed,
  setIsSiderCollapsed,
}: MainSiderProps) => {
  const pathname = usePathname();

  const { verifyACR, verifyACP } = AuthService.useAuth();
  const { deviceType } = useWindowSize();

  const leftSideBarRef = useRef<HTMLDivElement>(null);

  const MENU_ITEMS: IMenuItem[] = useMemo(() => {
    const handleMenuItems = (menuItems) => {
      return cleanArray(
        menuItems.map((item) => {
          if (item.children) {
            const subActiveMenu = handleMenuItems(item.children);
            if (subActiveMenu.length == 0) return null;
            else
              return {
                ...item,
                children: subActiveMenu,
              };
          } else if (item == false) return null;
          else return item;
        }),
        [null]
      );
    };

    const menuItems = [
      {
        key: "statistical",
        label: "Thống kê",
        url: "/",
        icon: <ChartIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "order",
        label: "Đơn hàng",
        url: "/order",
        icon: <OrderIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "transaction",
        label: "Giao dịch",
        url: "/transaction",
        icon: <TransactionIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "course-manage",
        label: "Quản lý khoá học",
        url: "/course-manage",
        icon: <BoxIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "notification-system",
        label: "Hệ thống báo báo",
        url: "/notification-system",
        icon: <ChartIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "student",
        label: "Học sinh",
        url: "/student",
        icon: <StudentIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "chat",
        label: "Chat",
        url: "/chat",
        icon: <ChatIcon className="w-[20px]" color="#546D78" />,
      },
      {
        key: "permission",
        label: "Phân Quyền",
        url: "/permission",
        icon: <SettingIcon className="w-[20px]" color="#546D78" />,
      },
    ];

    return handleMenuItems(menuItems) as IMenuItem[];
  }, [verifyACR]);

  const defaultSelectedKeys = useMemo(() => {
    const flattenMenuItems = MENU_ITEMS.map((item) =>
      item.children ? item.children : item
    ).flat();
    const activeMenuItem = flattenMenuItems.find(
      ({ url }) => url === pathname
    )?.key;
    return activeMenuItem ? [activeMenuItem] : [];
  }, [MENU_ITEMS, pathname]);

  const defaultOpenKeys = useMemo(() => {
    const activeSubMenuItem = MENU_ITEMS.find(({ children }) => {
      return children?.some(({ url }) => url === pathname);
    })?.key;
    return activeSubMenuItem ? [activeSubMenuItem] : [];
  }, [MENU_ITEMS, pathname]);

  const onShowScrollBar = () => {
    if (leftSideBarRef.current) {
      leftSideBarRef.current.className =
        leftSideBarRef.current.className.replace(
          "scrollbar-y-hidden",
          "scrollbar-y-dark"
        );
    }
  };

  const onHideScrollBar = () => {
    if (leftSideBarRef.current) {
      leftSideBarRef.current.className =
        leftSideBarRef.current.className.replace(
          "scrollbar-y-dark",
          "scrollbar-y-hidden"
        );
    }
  };

  return (
    <Layout.Sider
      width={320}
      collapsed={isSiderCollapsed}
      onMouseLeave={onHideScrollBar}
      onMouseEnter={onShowScrollBar}
      style={{ minHeight: "100vh", background: "white" }}
      collapsedWidth={deviceType === "mobile" ? 0 : "80px"}
    >
      <div
        className={clsx(
          "mt-9 mb-7 h-12 flex items-center justify-between pr-6 pl-7 header",
          styles.mainHeader
        )}
      >
        <img
          src="https://admin.mapxdev.com/images/logo-128.png"
          alt=""
          className="h-full aspect-square image"
        />
        <div
          onClick={() => setIsSiderCollapsed((prev) => !prev)}
          className="size-7 rounded overflow-hidden hover:bg-slate-100 active:bg-slate-200 cursor-pointer max-tab:hidden"
        >
          <ChevronsIcon
            className={clsx(
              "w-7 h-7 transition-all duration-300",
              isSiderCollapsed ? "-scale-x-100" : ""
            )}
          />
        </div>
      </div>

      <div
        className="sticky top-0 h-screen overflow-auto scrollbar-y-hidden px-[3px]"
        style={{
          scrollbarGutter: "stable both-edges",
        }}
        ref={leftSideBarRef}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          className={styles.mainMenu}
          items={MENU_ITEMS.map(({ key, label, icon, url, children }) => {
            const isSubMenu = children?.length;
            return {
              key,
              icon,
              label: !isSubMenu ? (
                <Link href={url ?? "#"}>{label}</Link>
              ) : (
                label
              ),
              children: children?.map((child) => ({
                ...child,
                label: <Link href={child.url ?? "#"}>{child.label}</Link>,
              })),
            };
          })}
        />
      </div>
    </Layout.Sider>
  );
};

export default MainSider;
