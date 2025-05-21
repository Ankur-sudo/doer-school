import StoreProvider from "@/lib/StoreProvider";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOER ADMISSION",
  description: "DOER ADMISSION platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <StoreProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1a5683",
                borderRadius: 4,
                colorBgContainer: "#ffffff",
                colorBorder: "#dfe5ed",
                colorText: "#5d5d5d",
                colorTextSecondary: "#6284a8",
                colorError: "#eb5757",
                fontSize: 14,
              },
              components: {
                Button: {
                  controlHeight: 40,
                  paddingInline: 16,
                  borderRadius: 4,
                  colorPrimaryHover: "#135786",
                },
                Input: {
                  controlHeight: 40,
                  borderRadius: 4,
                  colorBorder: "#dfe5ed",
                },
                Card: {
                  borderRadiusLG: 8,
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                  paddingLG: 24,
                },
                Checkbox: {
                  borderRadius: 2,
                  colorPrimary: "#1a5683",
                },
                Divider: {
                  colorSplit: "#dfe5ed",
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
