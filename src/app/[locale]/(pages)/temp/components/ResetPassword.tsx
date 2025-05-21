import InPassword from "@/components/common/FormItems/InPassword";
import {
  useChangePassMutation,
  useGetOtpMutation,
  useOtpConfirmMutation,
} from "../forgot-password/lib/api/loginApi";
import { Button, Form, Input, StepProps } from "antd";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { rule_confirmPassword, rule_required } from "@/utils/rules/formRules";
import { useMessageGroup } from "@/contexts/MessageGroup";

type Props = {
  setSteps: Dispatch<SetStateAction<StepProps[]>>;
  mobileNo: string;
  time: number;
};

export default function ResetPassword({ setSteps, mobileNo, time }: Props) {
  const [form] = Form.useForm();
  const [changePass, { isError, isLoading, isSuccess, error, data }] =
    useChangePassMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "Password-Reset-Change-Password-Message-Group",
      error,
      success_content: "Password Reset Done!",
      success_url: "",
    });
    if (isSuccess) {
      setSteps((item) => {
        const itemTemp = [...item];
        itemTemp[0].status = "finish";
        itemTemp[1].status = "finish";
        itemTemp[2].status = "finish";
        itemTemp[3].status = "process";
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
          changePass({
            emailOrMobile: mobileNo,
            newPassword: form.getFieldValue("newPassword"),
            confirmPassword: form.getFieldValue("confirmPassword"),
          });
        }}
        layout="vertical"
        className="!pt-[40px]"
        size="large"
      >
        <InPassword<any>
          name={["newPassword"]}
          label="Password"
          rules={[rule_required()]}
          placeholder="Enter password"
          bPoint={{
            xs: 24,
            sm: 24,
            lg: 24,
            md: 24,
            xl: 24,
            xxl: 24,
          }}
        />
        <InPassword<any>
          name={["confirmPassword"]}
          label="Confirm Password"
          rules={[rule_confirmPassword("newPassword"), rule_required()]}
          placeholder="Enter password"
          bPoint={{
            xs: 24,
            sm: 24,
            lg: 24,
            md: 24,
            xl: 24,
            xxl: 24,
          }}
        />

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
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
