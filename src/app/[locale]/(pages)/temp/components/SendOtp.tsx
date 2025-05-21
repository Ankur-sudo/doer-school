import { useMessageGroup } from "@/contexts/MessageGroup";
import { Button, Form, Input, StepProps } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetOtpForgotPasswordMutation } from "../forgot-password/lib/api/loginApi";

type Props = {
  setSteps: Dispatch<SetStateAction<StepProps[]>>;
  setMobileNo: Dispatch<SetStateAction<string>>;
};

export default function SendOtp({ setSteps, setMobileNo }: Props) {
  const [form] = Form.useForm();
  const [getOtp, { isError, isLoading, isSuccess, error, data }] =
    useGetOtpForgotPasswordMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "Password-Reset-Message-Group",
      success_url: "",
      error,
      success_content: "We have send an OTP on your phone.",
    });
    if (isSuccess) {
      setMobileNo(form.getFieldValue("emailOrMobile"));
      setSteps((item) => {
        const itemTemp = [...item];
        itemTemp[0].status = "finish";
        itemTemp[1].status = "process";
        itemTemp[2].status = "wait";
        itemTemp[3].status = "wait";
        return itemTemp;
      });
      form.resetFields();
    }
  }, [isError, isLoading, isSuccess, error]);
  return (
    <Form
      form={form}
      name="login_form"
      initialValues={{ remember: true }}
      onFinish={getOtp}
      layout="vertical"
      className="!pt-[40px]"
      size="large"
    >
      <Form.Item<any>
        label="Mobile Or Login Id"
        name="emailOrMobile"
        rules={[
          {
            required: true,
            message: "Please input your Mobile or Login Id!",
          },
        ]}
      >
        <Input placeholder="Enter Mobile or Login Id" size="large" />
      </Form.Item>

      {/* <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item> */}

      <Form.Item>
        <Button
          style={{
            width: "100%",
            padding: "20px",
            fontSize: "16px",
            fontFamily: "var(--font-poppins)",
          }}
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Send OTP
        </Button>
      </Form.Item>
    </Form>
  );
}
