import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import type React from "react";

export default async function RootLayout({
  children,
}: // params: { locale },
Readonly<{
  children: React.ReactNode;
  // params: { locale: string };
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
