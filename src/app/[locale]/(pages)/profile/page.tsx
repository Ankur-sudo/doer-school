"use client";

import { useState } from "react";
import Image from "next/image";
import { Input, Button, Card, Row, Col, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Link } from "@/MUST_USE_IT_navigation";

// School card component for reusability
const SchoolCard = ({
  name = "Adamjee Cantonment Public School & College",
  ein = "12345678",
  isPending = false,
  studentDetails = null,
}: any) => {
  return (
    <Card
      className={`border-0 rounded-xl overflow-hidden shadow-sm ${
        isPending ? "bg-gray-50" : "bg-gray-50"
      }`}
      styles={{ body: { padding: "0px" } }}
    >
      <div className={classNames("flex gap-4")}>
        <div
          className="flex-grow"
          style={{ padding: isPending ? "24px" : "16px" }}
        >
          {isPending ? (
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center">
                <div className="w-[88px] h-[88px] rounded-full flex-shrink-0 overflow-hidden flex justify-center items-center">
                  <Image src="/favicon.png" alt={name} width={50} height={50} />
                </div>
                <div className="ml-4">
                  <h3 className="text-[#1a5683] font-medium text-base">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">EIN: {ein}</p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0 md:ml-auto">
                <div className="w-[64px] h-[64px] mr-6">
                  <Avatar
                    icon={"U"}
                    size={64}
                    className="border-2 border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="text-sm font-medium text-[#1a5683]">
                    {studentDetails?.name}
                  </div>

                  <div className="text-sm text-gray-500">Class</div>
                  <div className="text-sm font-medium text-[#1a5683]">
                    {studentDetails?.class}
                  </div>

                  <div className="text-sm text-gray-500">Group</div>
                  <div className="text-sm font-medium text-[#1a5683]">
                    {studentDetails?.group}
                  </div>

                  <div className="text-sm text-gray-500">Shift</div>
                  <div className="text-sm font-medium text-[#1a5683]">
                    {studentDetails?.shift}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-[64px] h-[64px] rounded-full flex-shrink-0 overflow-hidden flex justify-center items-center">
                <Image src="/favicon.png" alt={name} width={35} height={35} />
              </div>
              <div className="ml-4">
                <h3 className="text-[#1a5683] font-medium text-base">{name}</h3>
                <p className="text-sm text-gray-500 mt-1">EIN: {ein}</p>
              </div>
            </div>
          )}
        </div>
        {isPending ? (
          <Link
            className=" bg-[#1a5683] text-white font-extrabold px-8 flex justify-center items-center"
            href={"/admission"}
          >
            <div>Continue</div>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for the student
  const studentDetails = {
    name: "Mahin Muntasir",
    class: "Nine",
    group: "Science",
    shift: "N/A",
  };

  // Mock data for schools
  const schools = Array(9).fill({
    name: "Adamjee Cantonment Public School & College",
    ein: "12345678",
  });

  return (
    <div className="container mx-auto pt-[40px] pb-[120px]">
      {/* Welcome section */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold text-[#1a5683] mb-1">
          Welcome, Mahin Muntasir...!
        </h1>
        <p className="text-[#5d5d5d] text-base">
          Let's help you find the right school.
        </p>
      </div>

      {/* Pending Application */}
      <div className="mb-12">
        <h2 className="text-[22px] font-bold text-[#1a5683] mb-4">
          Pending Application
        </h2>
        <SchoolCard isPending={true} studentDetails={studentDetails} />
      </div>

      {/* On Going Admission */}
      <div>
        <h2 className="text-[22px] font-bold text-[#1a5683] mb-4">
          On Going Admission
        </h2>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by School Name or EIN Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-10"
            style={{ borderRadius: "4px" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="bg-[#1a5683] h-10 px-6"
          >
            Search
          </Button>
        </div>

        {/* School grid */}
        <Row gutter={[16, 16]}>
          {schools.map((school, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <SchoolCard name={school.name} ein={school.ein} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
