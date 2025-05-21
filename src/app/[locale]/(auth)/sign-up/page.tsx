"use client";

import { Button, Checkbox, Divider, Form, Input } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "@/MUST_USE_IT_navigation";

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

export default function SignUpPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      // Handle sign up logic here
      console.log("Sign up values:", values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a5683]">Sign Up</h1>
        <p className="text-gray-500 mt-2">
          Enter your email and password to log in...!
        </p>
      </div>

      <Form
        form={form}
        name="signup"
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

        <Form.Item
          label={
            <span className="text-[#1a5683] font-medium">
              Confirm Password*
            </span>
          }
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
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

        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox className="text-gray-600">Keep me logged in</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-10 bg-[#1a5683] hover:bg-[#134b75]"
          >
            Sign Up
          </Button>
        </Form.Item>

        <div className="text-center text-gray-500 text-sm mb-4">
          Already registered?{" "}
          <Link href="/sign-in" className="text-[#1a5683] hover:underline">
            Sign In
          </Link>
        </div>

        <Divider plain className="text-gray-400">
          or
        </Divider>

        <Button
          icon={<GoogleOutlined />}
          className="w-full h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-neutral-200 border-gray-200 dark:border-neutral-800"
        >
          Sign in with Google
        </Button>
      </Form>

      <div className="mt-8 text-center text-xs text-gray-500 md:hidden">
        © 2025 DOER Admission. All Rights Reserved. Made with love by
        bettercallmahin!
      </div>
    </div>
  );
}
