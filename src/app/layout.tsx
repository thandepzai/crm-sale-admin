import TanstackProvider from "@module/_core/app/component/TanstackProvider";
import AppWrapper from "@module/_core/app/component/AppWrapper";
import "@ant-design/v5-patch-for-react-19";
import { App as AntdApp, ConfigProvider } from "antd";
import { GlobalNotification } from "@module/_core/app/component/GlobalNotification";
import "@style/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no"
        />
        <meta property="og:site_name" content="Mapstudy"></meta>

        <link
          rel="icon"
          href="https://mapstudy.edu.vn/assets/images/logo/logo-32.png"
        ></link>
      </head>
      <body className="font-sans">
        <TanstackProvider>
          <ConfigProvider>
            <AntdApp>
              <GlobalNotification />
              <AppWrapper>{children}</AppWrapper>
            </AntdApp>
          </ConfigProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
