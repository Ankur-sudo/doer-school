import { MessageGroupProvider } from "@/contexts/MessageGroup";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp } from "antd";
//import { getMessages } from "next-intl/server";
import type React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOER ADMISSION",
  description: "DOER ADMISSION",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: // params: { locale },
Readonly<{
  children: React.ReactNode;
  // params: { locale: string };
}>) {
  // const messages = await getMessages();
  return (
    <AntdApp>
      <AntdRegistry>

        <MessageGroupProvider>{children}</MessageGroupProvider>

      </AntdRegistry>
    </AntdApp>
  );
}
