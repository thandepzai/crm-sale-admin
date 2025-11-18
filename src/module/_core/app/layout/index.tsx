import { ReactNode, memo, useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import MainSider from "./MainSider";
import MainBreadcrumb from "./MainBreadcrumb";
import { useWindowSize } from "@lib/hook/useWindowSize";
import { Layout } from "antd";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { deviceType } = useWindowSize();
  const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

  useEffect(() => {
    if (deviceType === "mobile" || deviceType === "tablet")
      setIsSiderCollapsed(true);
  }, [deviceType]);

  return (
    <Layout className="min-h-screen relative">
      <MainSider
        isSiderCollapsed={isSiderCollapsed}
        setIsSiderCollapsed={setIsSiderCollapsed}
      />
      <Layout
        style={{
          transitionDuration: "0.3s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <MainHeader
          isSiderCollapsed={isSiderCollapsed}
          setIsSiderCollapsed={setIsSiderCollapsed}
        />
        <MainBreadcrumb />
        <Layout.Content className="p-0 bg-background">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default memo(MainLayout);
