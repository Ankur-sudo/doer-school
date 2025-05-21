'use client';

import { useState } from 'react';
import { Menu, Dropdown, Input, Avatar, Button } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  BulbOutlined,
  MenuOutlined,
} from '@ant-design/icons';

export default function NavBar() {
  const navLinks = [
    { title: 'Home', href: '#' },
    { title: 'Admission', href: '#' },
    { title: 'Contact Us', href: '#' },
  ];

  const menu = (
    <Menu
      items={navLinks.map((link) => ({
        key: link.href,
        label: <a href={link.href}>{link.title}</a>,
      }))}
    />
  );

  const [collapsed, setCollapsed] = useState(false);

  return (
    <header className="w-full px-4 md:px-12 py-3 bg-[#f4f7fe] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo and Nav */}
        <div className="flex items-center gap-6">
          <img src="/vector.svg" alt="Logo" className="h-10 w-auto" />

          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-[#5d5d5d] hover:text-[#135786] font-medium transition"
              >
                {link.title}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-3 bg-white rounded-full border border-[#f4f7fe] px-3 py-1 shadow-md w-full md:w-auto">
          <div className="flex items-center bg-[#f4f7fe] rounded-full px-3 py-1 w-full md:w-56">
            <SearchOutlined className="text-[#2b3674] text-sm" />
            <Input
              bordered={false}
              placeholder="Search"
              className="bg-transparent text-sm text-[#8e9ab9] font-medium focus:shadow-none focus:outline-none"
            />
          </div>

          <Button
            type="text"
            icon={<BellOutlined className="text-lg text-[#135786]" />}
          />
          <Button
            type="text"
            icon={<BulbOutlined className="text-lg text-[#135786]" />}
          />
          <img
            src="/vector-1.svg"
            alt="Menu"
            className="w-5 h-5 cursor-pointer"
          />
          <Avatar
            src="/whatsapp-image-2025-04-16-at-2-59-54-pm-1.png"
            size="large"
          />
        </div>
      </div>
    </header>
  );
}
