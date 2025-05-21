import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | DOER ADMISSION",
  description: "Login or sign up to DOER ADMISSION",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br bg-[#DFE5ED]">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 rounded-br-[200px] bg-white shadow-2xl">
        {children}
      </div>
      <div className="hidden md:flex md:flex-1 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-full max-w-[300px] flex flex-col items-center">
            <div className="w-40 h-40 bg-[#1a5683] flex items-center justify-center">
              <div className="w-16 h-16 bg-white"></div>
            </div>
            <div className="text-[#1a5683] text-5xl font-bold mt-4">DOER</div>
            <div className="text-[#1a5683] text-2xl mt-2">ADMISSION</div>
          </div>
        </div>
        <div className="absolute bottom-4 w-full text-center text-sm text-gray-500">
          © 2025 DOER Admission. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
