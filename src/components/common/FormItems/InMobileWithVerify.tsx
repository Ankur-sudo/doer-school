"use client";
import { Button, Col, Form, Input, Space } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useEffect, useState } from "react";
import Defaults from "../../../../constant/Defaults";
import { InputCommonProps } from "../../../../types/commonTypes";
import { is_bangladesh_mobile } from "@/utils/common";
import SendOtpModal from "../Modals/SendOtpModal";
import { useGetOtpMutation } from "@/app/[locale]/(pages)/temp/forgot-password/lib/api/loginApi";
import { useMessageGroup } from "@/contexts/MessageGroup";
const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
  type?: "text" | "password" | "email";
  skipCheckingMobile?: string;
}

export default function InMobileWithVerify<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  size,
  type,
  readOnly,
  disabled,
  form,
  skipCheckingMobile,
}: Props<T>) {
  const [showSendOtpBtn, setSendOtpBtn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getOtp, { isError, isLoading, isSuccess, error, data }] =
    useGetOtpMutation();
  const { notify } = useMessageGroup();

  const showModal = () => {
    getOtp({ emailOrMobile: form?.getFieldValue("mobileNumber") });
    setIsModalOpen(true);
  };

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "Mobile-Verify-Message-Group",
      success_url: "",
      error,
      success_content: "We have send an OTP on your phone.",
    });
    if (isError) {
      setIsModalOpen(false);
    }
  }, [isError, isLoading, isSuccess, error]);

  useEffect(() => {
    if (form?.getFieldValue("mobileNumber")) {
      form?.validateFields([name]);
    }
  }, [isVerified]);

  return (
    <Col
      xs={bPoint?.xs || 24}
      sm={bPoint?.sm || bPoint?.xs || 12}
      md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
      lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
      xl={
        bPoint?.xl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      xxl={
        bPoint?.xxl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      className="InMobileWithVerifyComponent"
    >
      <Item<T>
        name={name as NamePath}
        label={label}
        rules={[
          ...(rules || []),

          {
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              if (isVerified || value === skipCheckingMobile) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("You must verify the number!"));
            },
          },
        ]}
      >
        {/* <Space.Compact style={{ width: "100%" }}> */}
        <Input
          type={type || "text"}
          size={size || Defaults.inputFields}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled || isVerified}
          onChange={async (e) => {
            if (
              is_bangladesh_mobile(e.target.value) &&
              e.target.value !== skipCheckingMobile
            ) {
              setSendOtpBtn(true);
            } else {
              setSendOtpBtn(false);
            }
          }}
          prefix={<span className="pr-2">+88 </span>}
          addonAfter={
            showSendOtpBtn && !isVerified ? (
              <Button
                onClick={showModal}
                type="primary"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  padding: 5,
                  // width: "150px",
                }}
              >
                Send OTP
              </Button>
            ) : null
          }
        />
        {/* {showSendOtpBtn && !isVerified ? (
            <Button
              onClick={showModal}
              type="primary"
              style={{ fontSize: 12, fontWeight: "bold", padding: 5 }}
            >
              Send OTP
            </Button>
          ) : null} */}
        {/* </Space.Compact> */}
      </Item>

      <SendOtpModal
        setIsVerified={setIsVerified}
        mobileNumber={form?.getFieldValue("mobileNumber")}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLoading={isLoading}
      />
    </Col>
  );
}
