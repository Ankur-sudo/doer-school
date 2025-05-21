"use client";

import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "@/MUST_USE_IT_navigation";
import GoogleAuthButton from "@/components/common/GoogleAuthButton";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    message.info("Coming soon!");

    return;
    setLoading(true);
    try {
      // Handle login logic here
      console.log("Login values:", values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a5683]">Log In</h1>
        <p className="text-gray-500 mt-2">
          Enter your email and password to log in...!
        </p>
      </div>

      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label={<span className="text-[#1a5683] font-medium">Email*</span>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="username@email.com" className="py-2" />
        </Form.Item>

        <Form.Item
          label={<span className="text-[#1a5683] font-medium">Password*</span>}
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Min. 8 characters"
            className="py-2"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-gray-600">Keep me logged in</Checkbox>
          </Form.Item>
          <Link
            href="/forgot-password"
            className="text-gray-500 hover:text-[#1a5683] text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-10 bg-[#1a5683] hover:bg-[#134b75]"
          >
            Log In
          </Button>
        </Form.Item>

        <div className="text-center text-gray-500 text-sm mb-4">
          Not registered yet?{" "}
          <Link href="/sign-up" className="text-[#1a5683] hover:underline">
            Create an Account
          </Link>
        </div>

        <Divider plain className="text-gray-400">
          or
        </Divider>

        {/* Replace Button with GoogleAuthButton component */}
        <GoogleAuthButton />
      </Form>

      <div className="mt-8 text-center text-xs text-gray-500 md:hidden">
        © 2025 DOER Admission. All Rights Reserved. Made with love by
        bettercallmahin!
      </div>
    </div>
  );
}
