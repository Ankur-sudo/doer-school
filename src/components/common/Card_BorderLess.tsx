import { Card } from "antd";
import React from "react";

type Props = { children: React.ReactNode; title: string };

export default function Card_BorderLess({ children, title }: Props) {
  return (
    <Card
      bordered={false}
      style={{ boxShadow: "none", width: "100%", marginBottom: "20px" }}
      styles={{
        body: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        header: {
          padding: 0,
        },
      }}
      title={
        <span className="text-[18px] lg:text-[22px] text-gray-400 !font-bold font-poppins">
          {title}
        </span>
      }
    >
      {children}
    </Card>
  );
}
