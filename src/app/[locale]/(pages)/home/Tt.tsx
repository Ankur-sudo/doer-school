"use client"
import { Input, Button, Layout, Menu, Badge, Switch } from "antd"
import { SearchOutlined, BellOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import Image from "next/image"

const { Header, Content } = Layout

export default function EducationPlatform() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header className="flex items-center justify-between bg-white h-16 px-6 border-b border-gray-100">
        <div className="flex items-center">
          <div className="mr-8">
            <div className="w-10 h-10 bg-[#0A558C] flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
          </div>
          <Menu mode="horizontal" className="border-0" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="admission">Admission</Menu.Item>
            <Menu.Item key="contact">Contact Us</Menu.Item>
          </Menu>
        </div>
        <div className="flex items-center gap-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search"
            className="rounded-full w-48"
          />
          <Badge dot>
            <BellOutlined className="text-xl text-gray-500" />
          </Badge>
          <Switch checkedChildren="🌙" unCheckedChildren="☀️" defaultChecked={false} className="bg-gray-300" />
          <QuestionCircleOutlined className="text-xl text-gray-500" />
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      </Header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='pattern' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cpath d='M30,15 L60,15 L60,30 L30,30 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M60,30 L90,30 L90,60 L60,60 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Ccircle cx='120' cy='45' r='15' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M150,15 L180,15 L180,45 L150,45 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M40,80 L70,80 L70,110 L40,110 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Ccircle cx='100' cy='95' r='15' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M130,80 L160,80 L160,110 L130,110 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M30,140 L60,140 L60,170 L30,170 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3Ccircle cx='90' cy='155' r='15' fill='%23E6F0FB' opacity='0.4'/%3E%3Cpath d='M120,140 L150,140 L150,170 L120,170 Z' fill='%23E6F0FB' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23EDF5FF'/%3E%3Crect width='100%25' height='100%25' fill='url(%23pattern)'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
          }}
        ></div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold text-[#0A558C] leading-tight mb-6">
                Your Child's Future
                <br />
                Begins Here
              </h1>
              <p className="text-gray-600 text-lg mb-6 max-w-lg">
                A centralized digital platform to manage school admissions with ease — from{" "}
                <span className="text-[#0A558C] font-medium">discovery to enrollment</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="h-12 px-8 bg-[#0A558C] hover:bg-[#084b7d] border-none rounded-md"
                >
                  Apply Now
                </Button>
                <Button
                  size="large"
                  className="h-12 px-8 border-[#0A558C] text-[#0A558C] hover:text-[#084b7d] hover:border-[#084b7d] rounded-md"
                >
                  Explore Schools
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -bottom-10 -right-10 -left-10 bg-white rounded-full"></div>
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?height=500&width=400"
                    alt="Student with thumbs up"
                    width={400}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "👨‍🎓", number: "20000+", label: "Students" },
            { icon: "👨‍👩‍👧‍👦", number: "1643+", label: "Guardians" },
            { icon: "👨‍💼", number: "7000+", label: "Teachers" },
            { icon: "🏫", number: "2000+", label: "Schools" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg mr-4">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#0A558C]">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
