"use client"

import { useState } from "react"
import { Form, Input, Button, message } from "antd"
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons"

export default function ContactForm() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form values:", values)
      message.success("Message sent successfully!")
      form.resetFields()
    } catch (error) {
      message.error("Failed to send message. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#135786] mb-4">We're Here to Help</h1>
        <p className="text-[#717171] max-w-2xl mx-auto">Got questions or need help with the admission process?</p>
        <p className="text-[#717171] max-w-2xl mx-auto">
          Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
        {/* Left Panel - Contact Information */}
        <div className="bg-[#15273a] text-white p-8 md:p-10 md:w-2/5 relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-8 text-[#d6e1ef]">Say something to start a live chat!</p>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <PhoneOutlined className="text-[#6284a8]" />
              <span>+1012 3456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <MailOutlined className="text-[#6284a8]" />
              <span>demo@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <EnvironmentOutlined className="text-[#6284a8]" />
              <span>Dilkusha Center, Motijheel</span>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#173e5f] opacity-80"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#135786] opacity-80"></div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-[#f4f7fe] p-8 md:p-10 md:w-3/5">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="firstName"
                label={<span className="text-[#135786]">First Name</span>}
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input
                  placeholder="John"
                  bordered={false}
                  className="border-b-slate-900 border-black-500 focus:border-[#050505] focus:shadow-none placeholder-gray-400 rounded-none px-0 bg-transparent"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={<span className="text-[#135786]">Last Name</span>}
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input
                  placeholder="Doe"
                  bordered={false}
                  className="border-b border-gray-300 focus:border-[#000000] focus:shadow-none placeholder-gray-400 rounded-none px-0 bg-transparent"
                />
              </Form.Item>
            </div>





            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="email"
                label={<span className="text-[#135786]">Email</span>}
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  placeholder="Standard"
                  bordered={false}
                  className="!border-b !border-gray-300 focus:!border-blue-600 focus:!shadow-none rounded-none px-0 bg-transparent"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label={<span className="text-[#135786]">Phone Number</span>}
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input
                  placeholder="01X XXX XXX XXXX"
                  bordered={false}
                  className="border-b border-gray-300 focus:border-[#135786] focus:shadow-none placeholder-gray-400 rounded-none px-0 bg-transparent"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="message"
              label={<span className="text-[#135786]">Input Text Label</span>}
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input
                placeholder="Type here"
                bordered={false}
                className="border-b border-gray-300 focus:border-[#135786] focus:shadow-none placeholder-gray-400 rounded-none px-0 bg-transparent"
              />
            </Form.Item>

            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-[#135786] hover:bg-[#173e5f] text-white h-10 px-6"
              >
                Send Message
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
