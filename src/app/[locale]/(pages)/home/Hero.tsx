"use client";

import Image from "next/image";
import { Button, Card, Input } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  MoonOutlined,
  UserOutlined,
} from "@ant-design/icons";

const statsData = [
  {
    icon: "/graduated-1.png",
    count: "20000+",
    label: "Students",
  },
  {
    icon: "/family-1.png",
    count: "1643+",
    label: "Guardians",
  },
  {
    icon: "/teacher--1--1.png",
    count: "7000+",
    label: "Teachers",
  },
  {
    icon: "/school-1.png",
    count: "2000+",
    label: "Schools",
  },
];

const navItems = [
  { label: "Home", href: "#" },
  { label: "Admission", href: "#" },
  { label: "Contact Us", href: "#" },
];

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-[#d6e1ef] overflow-hidden">
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url(/homework-6558857-1920-1--traced-.png)" }}
      >
        {/* Navigation Bar */}
        <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 xl:px-32 py-4 absolute top-0 left-0 w-full bg-[#f4f7fe] z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Image
              src="/vector-1.svg"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <nav>
              <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-[#5d5d5d] text-sm md:text-base hover:text-[#135786]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 md:gap-5 p-2.5 bg-white rounded-full border-2 border-[#f4f7fe] shadow-lg mt-4 md:mt-0">
            <div className="flex items-center w-40 md:w-52 h-10 bg-[#f4f7fe] rounded-full px-3">
              <SearchOutlined className="text-[#2b3674]" />
              <Input
                placeholder="Search"
                bordered={false}
                className="bg-transparent text-sm text-[#8e9ab9] focus:ring-0 focus:outline-none"
              />
            </div>
            <BellOutlined className="text-[#2b3674] text-lg" />
            <MoonOutlined className="text-[#2b3674]" />
            <UserOutlined className="text-[#2b3674] text-lg" />
            <Image
              src="/whatsapp-image-2025-04-16-at-2-59-54-pm-1.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="relative w-full h-full pt-24 md:pt-32 z-0">
          {/* Background SVG */}
          <Image
            src="/subtract.svg"
            alt="Subtract"
            fill
            className="absolute object-cover bottom-0 left-0 w-full h-3/4 md:h-4/5"
          />

          {/* Hero Image Section */}
          <div className="absolute top-0 right-0 w-full md:w-1/2 lg:w-[674px] h-2/3 md:h-4/5 bg-white rounded-tl-[100px] overflow-hidden">
            <Image
              src="/happy-schoolboy-giving-thumbs-up-1.png"
              alt="Happy schoolboy"
              width={467}
              height={726}
              className="absolute top-8 md:top-16 left-1/2 transform -translate-x-1/2 md:left-28 md:translate-x-0 object-contain"
            />
          </div>

          {/* Hero Text Section */}
          <div className="flex flex-col w-full md:w-1/2 lg:w-[575px] items-start justify-center gap-8 px-4 md:px-8 lg:px-16 xl:pl-32 pt-8 md:pt-16">
            <div className="space-y-4">
              <h1 className="font-bold text-[#135786] text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight">
                Your Child&apos;s Future Begins Here
              </h1>
              <p className="text-[#5d5d5d] text-lg md:text-2xl">
                A centralized digital platform to manage school admissions with ease — from{" "}
                <span className="font-semibold text-[#135786]">
                  discovery to enrollment.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="primary"
                className="h-12 bg-[#135786] text-white rounded-lg px-6 text-lg"
              >
                Sign Up to Apply
              </Button>
              <Button
                className="h-12 bg-white text-[#135786] border border-[#135786] rounded-lg px-6 text-lg"
              >
                Explore Schools
              </Button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 absolute bottom-6 left-4 right-4 md:left-8 md:right-8 lg:left-16 lg:right-16 xl:left-32 xl:right-32">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                bordered={false}
                className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md"
              >
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  width={64}
                  height={64}
                  className="object-cover"
                />
                <div>
                  <div className="text-[#135786] font-bold text-xl">
                    {stat.count}
                  </div>
                  <div className="text-[#135786] text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
