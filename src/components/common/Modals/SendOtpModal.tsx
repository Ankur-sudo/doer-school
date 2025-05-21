import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Input, Modal, Spin } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import {
  useGetOtpMutation,
  useOtpConfirmMutation,
} from "@/app/[locale]/(pages)/temp/forgot-password/lib/api/loginApi";
import { useMessageGroup } from "@/contexts/MessageGroup";

type Props = {
  setIsVerified: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mobileNumber: string;
  isModalOpen: boolean;
  isLoading: boolean;
};

const SendOtpModal: React.FC<Props> = ({
  setIsVerified,
  mobileNumber,
  isModalOpen,
  setIsModalOpen,
  isLoading: isLoadingSendOtp,
}) => {
  const [confirmOtp, { isError, isLoading, isSuccess, error, data }] =
    useOtpConfirmMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "Mobile-Verify-Otp-Verify-Message-Group",
      error,
      success_content: "OTP matched!",
      success_url: "",
    });
    if (isSuccess) {
      setIsVerified(true);
      setIsModalOpen(false);
    }
  }, [isError, isLoading, isSuccess, error]);

  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text.length);
    if (text.length === 6 && Number(text)) {
      confirmOtp({ emailOrMobile: mobileNumber, otp: Number(text) });
    }
  };

  return (
    <>
      <Modal
        title="Verify Mobile"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        okText={"Submit"}
        footer={false}
        width={350}
      >
        {isLoadingSendOtp ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <p>
              We have sent an OTP to your mobile number{" "}
              <strong>{mobileNumber}</strong>
            </p>
            <br />
            <Input.OTP
              disabled={isLoading}
              formatter={(str) => str.toUpperCase()}
              onChange={onChange}
            />
            <br />
            <br />
          </>
        )}
      </Modal>
    </>
  );
};

export default SendOtpModal;
