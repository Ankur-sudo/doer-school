"use client"

import { useEffect, useState } from "react"
import {
  Button,
  Card,
  Badge,
  Typography,
  Row,
  Col,
  Space,
  ConfigProvider,
} from "antd"

const { Title, Text, Paragraph } = Typography

// Utility function to combine class names
const cn = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ")

interface SchoolDetail {
  icon: string
  label: string
  highlight?: boolean
}

interface School {
  id: number
  name: string
  logo: string
  isOngoing: boolean
  details: SchoolDetail[]
}

const AdmissionsPage: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const schoolsPerPage: number = 4
  const totalPages: number = Math.ceil(schools.length / schoolsPerPage)

  useEffect(() => {
    const fetchedSchools: School[] = [1, 2, 3, 4, 5, 6].map((_, index) => ({
      id: index + 1,
      name: `Green Leaf International School ${index + 1}`,
      logo: "/SchoolLogo.png",
      isOngoing: index === 2 || index === 4,
      details: [
        { icon: "🏆", label: "Class: 8" },
        { icon: "📅", label: "Session: 2026" },
        { icon: "📝", label: "Curriculum: National Curriculum" },
        { icon: "🔤", label: "Language: Bangla" },
        { icon: "👤", label: "Campus: Baridhara" },
        { icon: "🕒", label: "Shift: Morning" },
        { icon: "💰", label: "Fees: 200BDT", highlight: true },
      ],
    }))
    setSchools(fetchedSchools)
  }, [])

  const paginatedSchools: School[] = schools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
  )

  const themeConfig = {
    token: {
      colorPrimary: "#135786",
      colorSuccess: "#457b7d",
      colorText: "#5d5d5d",
      borderRadius: 6,
    },
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Title
            level={2}
            className="font-['Inter'] font-bold text-[#135786] text-3xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4"
          >
            Ongoing Admissions – Apply Today!
          </Title>
          <Paragraph className="text-[#5d5d5d] text-lg sm:text-lg md:text-xl max-w-3xl mx-auto mb-4">
            Admissions are now open for a range of top institutions.
          </Paragraph>
          <ParagraphWrapped
            className="text-[#5d5d5d] text-lg sm:text-lg md:text-xl max-w-3xl mx-auto"
            text="Find your school, apply in minutes, and stay updated throughout the process."
          />
        </div>

        {/* School Cards */}
        <Row gutter={[16, 16]} className="mb-10">
          {paginatedSchools.map((school) => (
            <Col xs={24} sm={12} lg={6} key={school.id}>
              <Badge.Ribbon
                text="ONGOING"
                color="#457b7d"
                className={cn(
                  school.isOngoing ? "block" : "hidden",
                  "rounded-bl-md rounded-tr-md right-[-4px] top-[-4px]"
                )}
              >
                <Card
                  bordered
                  className="h-full border-[#e4e4e4] rounded-lg"
                  bodyStyle={{ padding: "16px sm:p-6" }}
                >
                  {/* Logo & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e4e4e4] flex items-center justify-center bg-white">
                      <img
                        src={school.logo}
                        alt="School Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Text strong className="text-[#135786] text-base sm:text-lg">
                      {school.name}
                    </Text>
                  </div>

                  {/* Details */}
                  <Space direction="vertical" size={8} className="w-full">
                    {school.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Text className="text-[#5d5d5d] text-base">{detail.icon}</Text>
                        {detail.highlight ? (
                          <Text
                            className="text-[#5d5d5d] text-sm sm:text-base bg-[#d7f4ea] px-2 py-1 rounded"
                          >
                            {detail.label}
                          </Text>
                        ) : (
                          <Text className="text-[#5d5d5d] text-sm sm:text-base">
                            {detail.label}
                          </Text>
                        )}
                      </div>
                    ))}
                  </Space>

                  {/* Buttons */}
                  <Space direction="vertical" size={12} className="w-full mt-6">
                    <Button
                      type="default"
                      block
                      href={`/schools/${school.id}/circular.pdf`}
                      target="_blank"
                      className="border-[#135786] text-[#135786] bg-transparent hover:bg-[#135786] hover:text-white"
                    >
                      Download Circular
                    </Button>
                    <Button
                      type="primary"
                      block
                      href={`/apply/${school.id}`}
                      className="bg-[#135786] text-white"
                    >
                      Apply Now
                    </Button>
                  </Space>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={cn(
                "w-6 h-2 rounded cursor-pointer",
                currentPage === index + 1 ? "bg-[#135786]" : "bg-[#e4e4e4]"
              )}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            className="px-6 md:px-8 text-base md:text-lg"
          >
            View All
          </Button>
        </div>
      </div>
    </ConfigProvider>
  )
}

// Workaround for Paragraph typing issue
const ParagraphWrapped: React.FC<{ className?: string; text: string }> = ({ className, text }) => (
  <Paragraph className={className}>{text}</Paragraph>
)

export default AdmissionsPage