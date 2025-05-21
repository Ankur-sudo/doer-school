"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { Link } from "@/MUST_USE_IT_navigation";
import { BellOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Input } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Service", href: "/" },
  { label: "About Us", href: "/" },
  { label: "Contact Us", href: "/" },
];

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  console.log(user);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme toggle logic here
  };

  const userMenuItems = [
    {
      key: "profile",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "settings",
      label: <Link href="/">Settings</Link>,
    },
    {
      key: "logout",
      label: <div onClick={logout}>Logout</div>,
    },
  ];

  // Function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-[#F4F7FE] shadow-sm px-4 md:px-8 py-[20px]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={"/favicon.png"}
              alt="Doer Admission logo"
              height={64}
              width={42}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium relative ${
                  isActive(item.href)
                    ? "text-[#1a5683]"
                    : "text-gray-600 hover:text-[#1a5683]"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-[-12px] left-0 w-full h-[2px] bg-[#1a5683]"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`py-2 text-sm font-medium ${
                    isActive(item.href) ? "text-[#1a5683]" : "text-gray-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="flex gap-4 justify-center items-center">
          {/* Right side controls */}
          <div className="flex items-center gap-3 bg-white p-[10px] rounded-full">
            {/* Search */}
            <div className="hidden md:block">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined style={{ color: "#8f9bba" }} />}
                className="w-48 lg:w-64 !rounded-full"
                style={{ border: "none", backgroundColor: "#F4F7FE" }}
              />
            </div>

            {/* Notifications */}
            <Badge count={0} showZero={false} dot>
              <Button
                type="text"
                shape="circle"
                icon={<BellOutlined style={{ fontSize: "24px" }} />}
                className="flex items-center justify-center !text-[#A3AED0]"
              />
            </Badge>

            {/* Theme toggle */}
            {/* <Button
              type="text"
              shape="circle"
              icon={
                isDarkMode ? (
                  <IoSunnyOutline style={{ fontSize: "24px" }} />
                ) : (
                  <FaMoon style={{ fontSize: "24px" }} />
                )
              }
              onClick={toggleTheme}
              className="flex items-center justify-center !text-[#A3AED0]"
            /> */}

            {/* User profile */}
            {isLoggedIn ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                overlayStyle={{ minWidth: 200 }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar
                    icon={user ? user.name[0] : "U"}
                    size={36}
                    className="border-2 border-gray-200 cursor-pointer"
                  />
                </a>
              </Dropdown>
            ) : (
              <Link href={"/sign-in"}>
                <Button
                  type="dashed"
                  shape="round"
                  icon={
                    <div className="flex gap-1 items-center">
                      <IoMdLogIn className="text-xl" />
                      Sign-In
                    </div>
                  }
                  className="flex items-center justify-center !text-[#A3AED0]"
                />
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </header>
  );
}
