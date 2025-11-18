"use client";
import "@style/globals.css";
import { ThemeProvider } from "@style/antd.theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App as AntdApp, ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function TanstackProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={ThemeProvider}>
        <AntdApp>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
