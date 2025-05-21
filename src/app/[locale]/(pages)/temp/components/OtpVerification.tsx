import { Button, Form, Input, StepProps } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useOtpConfirmMutation } from "../forgot-password/lib/api/loginApi";
import { useMessageGroup } from "@/contexts/MessageGroup";

type Props = {
  setSteps: Dispatch<SetStateAction<StepProps[]>>;
  mobileNo: string;
  time: number;
};

export default function OtpVerification({ setSteps, mobileNo, time }: Props) {
  const [form] = Form.useForm();
  const [confirmOtp, { isError, isLoading, isSuccess, error, data }] =
    useOtpConfirmMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "Password-Reset-Otp-Verify-Message-Group",
      error,
      success_content: "OTP matched!",
      success_url: "",
    });
    if (isSuccess) {
      setSteps((item) => {
        const itemTemp = [...item];
        itemTemp[0].status = "finish";
        itemTemp[1].status = "finish";
        itemTemp[2].status = "process";
        itemTemp[3].status = "wait";
        return itemTemp;
      });
      form.resetFields();
    }
  }, [isError, isLoading, isSuccess, error]);

  return (
    <div>
      <Form
        form={form}
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={() => {
          confirmOtp({
            emailOrMobile: mobileNo,
            otp: Number(form.getFieldValue("otp")),
          });
        }}
        layout="vertical"
        className="!pt-[40px]"
        size="large"
      >
        <Form.Item<any>
          label="OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP.",
            },
          ]}
        >
          <Input placeholder="Enter otp" size="large" />
        </Form.Item>
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
            disabled={time <= 0}
          >
            Submit OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
