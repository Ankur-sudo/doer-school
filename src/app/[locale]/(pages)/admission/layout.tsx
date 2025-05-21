import type React from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Student Admission | DOER ADMISSION",
  description: "Student admission application for schools and colleges",
};

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="py-6">
        <div className=" rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#F4F7FE] mb-8 p-6 flex items-center gap-6">
            <div className="flex-shrink-0 h-[80px] w-[80px] rounded-full overflow-hidden flex justify-center items-center">
              <Image
                src="/favicon.png"
                alt="School Logo"
                width={40}
                height={40}
                className=""
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a5683]">
                Adamjee Cantonment Public School & College
              </h1>
              <p className="text-gray-500">School tagline</p>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
