"use client";

import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

export type StepStatus = "completed" | "current" | "pending" | "error";

export interface Step {
  key: string;
  title: string;
  status: StepStatus;
  href?: string;
}

interface CompactStepperProps {
  steps: Step[];
  currentStep: number;
}

export const CompactStepper: React.FC<CompactStepperProps> = ({
  steps,
  currentStep,
}) => {
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

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div className="relative">
                {step.href ? (
                  <Link href={step.href}>
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full ${getStepColor(
                        step.status
                      )} cursor-pointer`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircleOutlined className="text-white text-xs" />
                      ) : step.status === "error" ? (
                        <CloseCircleOutlined className="text-white text-xs" />
                      ) : (
                        <span className="text-white text-xs">{index + 1}</span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${getStepColor(
                      step.status
                    )}`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircleOutlined className="text-white text-xs" />
                    ) : step.status === "error" ? (
                      <CloseCircleOutlined className="text-white text-xs" />
                    ) : (
                      <span className="text-white text-xs">{index + 1}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${getLineColor(index)}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
