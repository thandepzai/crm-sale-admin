import { HomeOutlined } from "@ant-design/icons";
import { AuthService } from "module/auth/domain/service/auth";
import { cleanArray } from "lib/util/functions";
import { Layout, Menu } from "antd";
import Link from "next/link";
import React, { useMemo, useRef } from "react";
import { IMenuItem } from "./data";
import { useWindowSize } from "@lib/hook/useWindowSize";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import clsx from "clsx";
import { ChevronsIcon } from "../../icon/ChevronsIcon";

interface MainSiderProps {
  isSiderCollapsed: boolean;
}

const MainSider = ({ isSiderCollapsed }: MainSiderProps) => {
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
        key: "dev",
        label: "Dev Page",
        url: "/dev",
        icon: React.createElement(HomeOutlined),
      },
      {
        key: "home",
        label: "Home Page",
        url: "/",
        icon: React.createElement(HomeOutlined),
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
      className={clsx(
        "!fixed !z-30 !h-auto tab:!relative bg-white",
        styles.mainSider
      )}
      style={{ minHeight: "100vh" }}
      collapsedWidth={deviceType === "mobile" ? 0 : "80px"}
    >
      <div className="mt-9 mb-7 h-12 flex items-center justify-between pr-6 pl-7">
        <img
          src="https://admin.mapxdev.com/images/logo-128.png"
          alt=""
          className="h-full aspect-square"
        />
        <div className="w-7 h-7 cursor-pointer rounded overflow-hidden hover:bg-slate-100 active:bg-slate-200">
          <ChevronsIcon className="w-7 h-7" />
        </div>
      </div>

      <div
        className="sticky top-0 h-[100vh] overflow-auto scrollbar-y-hidden px-[3px]"
        style={{
          scrollbarGutter: "stable both-edges",
        }}
        ref={leftSideBarRef}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          className="font-medium !border-0"
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
