"use client";

import React from "react";
import { Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export type StepStatus = "completed" | "current" | "pending" | "error";

export interface Step {
  key: string;
  title: string;
  status: StepStatus;
  icon?: React.ReactNode;
  href?: string;
}

interface AdmissionStepperProps {
  steps: Step[];
  currentStep: number;
}

export const AdmissionStepper: React.FC<AdmissionStepperProps> = ({
  steps,
  currentStep,
}) => {
  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined className="!text-white" />;
      case "error":
        return <CloseCircleOutlined className="!text-white" />;
      case "current":
        return <SettingOutlined className="!text-white" />;
      default:
        return null;
    }
  };

  const getStepColor = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return "bg-[#1a5683]";
      case "current":
        return "bg-[#1a5683]";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  const getLineColor = (index: number) => {
    if (index >= currentStep) return "bg-gray-200";
    return "bg-[#1a5683]";
  };

  const getTextColor = (status: StepStatus) => {
    switch (status) {
      case "completed":
      case "current":
        return "text-[#1a5683] font-medium";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <Tooltip title={step.title}>
                <div className="relative">
                  {step.href ? (
                    <Link href={step.href}>
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepColor(
                          step.status
                        )} cursor-pointer`}
                      >
                        {getStepIcon(step.status) || (
                          <span className="!text-white font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepColor(
                        step.status
                      )}`}
                    >
                      {getStepIcon(step.status) || (
                        <span className="text-white font-medium">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Tooltip>
              <div className={`mt-2 text-sm ${getTextColor(step.status)}`}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${getLineColor(index)}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
