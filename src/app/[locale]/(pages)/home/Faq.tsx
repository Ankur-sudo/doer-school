"use client";

import { useState } from "react";
import { Typography, List, Button, Row, Col, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function Faq() {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const screens = useBreakpoint();

  const faqItems = [
    {
      id: 1,
      question: "How does the online admission portal work?",
      answer:
        "Through our online portal, you can easily search for schools, fill out application forms, upload required documents, pay the application fee, and complete the admission process — all from the comfort of your home.",
    },
    {
      id: 2,
      question: "How can I select a school?",
      answer:
        "You can browse through our comprehensive list of schools, filter by location, programs, and other criteria to find the best match for your educational needs.",
    },
    {
      id: 3,
      question: "How do I pay the application fee?",
      answer:
        "The application fee can be paid securely through our portal using credit/debit cards, net banking, or other supported payment methods.",
    },
    {
      id: 4,
      question: "What should I do after making the payment?",
      answer:
        "After payment, you'll receive a confirmation. You can then complete any remaining sections of your application and submit it for review.",
    },
    {
      id: 5,
      question: "Can I save my application and pay later?",
      answer:
        "Yes, you can save your application progress at any time and return later to complete it and make the payment.",
    },
    {
      id: 6,
      question: "Can I edit my application if I make a mistake?",
      answer:
        "Yes, you can edit your application before final submission. After submission, you may need to contact the admissions office for any changes.",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 16px" }}>
      <Title level={2} style={{ color: "#135786", textAlign: "center", marginBottom: "40px" }}>
        Frequently Asked Questions (FAQ)
      </Title>

      <Row gutter={[24, 24]}>
        {/* Question List */}
        <Col xs={24} md={10}>
          <List
            dataSource={faqItems}
            renderItem={(item) => (
              <List.Item
                onClick={() => setActiveQuestion(item.id)}
                style={{
                  cursor: "pointer",
                  background: activeQuestion === item.id ? "#e6f4ff" : "#fff",
                  padding: "16px",
                  borderRadius: "6px",
                  marginBottom: "12px",
                  boxShadow: activeQuestion === item.id ? "0 0 4px rgba(19, 87, 134, 0.2)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Button
                    type={activeQuestion === item.id ? "primary" : "default"}
                    shape="circle"
                    size="small"
                    style={{ marginRight: "12px" }}
                  >
                    {item.id}
                  </Button>
                  <Paragraph
                    style={{
                      flex: 1,
                      margin: 0,
                      fontWeight: activeQuestion === item.id ? "500" : "normal",
                      color: "#5d5d5d",
                    }}
                  >
                    {item.question}
                  </Paragraph>
                  {activeQuestion === item.id ? (
                    <LeftOutlined style={{ color: "#135786" }} />
                  ) : (
                    <RightOutlined style={{ color: "#a0b3ca" }} />
                  )}
                </div>
              </List.Item>
            )}
          />
        </Col>

        {/* Answer Section */}
        <Col xs={24} md={14}>
          <div
            style={{
              background: "#f4f7fe",
              padding: "24px",
              borderRadius: "8px",
              minHeight: "250px",
            }}
          >
            <Title level={4} style={{ color: "#135786", marginBottom: "16px" }}>
              {activeQuestion}. {faqItems.find((item) => item.id === activeQuestion)?.question}
            </Title>
            <Paragraph style={{ color: "#5d5d5d", lineHeight: "1.6" }}>
              {faqItems.find((item) => item.id === activeQuestion)?.answer}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
}
