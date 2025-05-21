"use client";

import { useState } from "react";
import {
  AdmissionStepper,
  type Step,
} from "@/components/admissions/stepper/AdmissionStepper";
import { Button, Form, Select, Input } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function AdmissionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps: Step[] = [
    {
      key: "application-details",
      title: "Application Details",
      status:
        currentStep === 0
          ? "current"
          : currentStep > 0
          ? "completed"
          : "pending",
    },
    {
      key: "student-information",
      title: "Student Information",
      status:
        currentStep === 1
          ? "current"
          : currentStep > 1
          ? "completed"
          : "pending",
    },
    {
      key: "guardian-information",
      title: "Guardian Information",
      status:
        currentStep === 2
          ? "current"
          : currentStep > 2
          ? "completed"
          : "pending",
    },
    {
      key: "previous-school",
      title: "Previous School Information",
      status:
        currentStep === 3
          ? "current"
          : currentStep > 3
          ? "completed"
          : "pending",
    },
    {
      key: "document-upload",
      title: "Document Upload",
      status:
        currentStep === 4
          ? "current"
          : currentStep > 4
          ? "completed"
          : "pending",
    },
    {
      key: "review-submit",
      title: "Review & Submit",
      status:
        currentStep === 5
          ? "current"
          : currentStep > 5
          ? "completed"
          : "pending",
    },
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ApplicationDetailsForm form={form} />;
      case 1:
        return <StudentInformationForm form={form} />;
      case 2:
        return <GuardianInformationForm form={form} />;
      case 3:
        return <PreviousSchoolForm form={form} />;
      case 4:
        return <DocumentUploadForm form={form} />;
      case 5:
        return <ReviewSubmitForm form={form} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AdmissionStepper steps={steps} currentStep={currentStep} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="max-w-full"
      >
        {renderStepContent()}

        <div className="flex justify-between mt-8">
          <Button
            type="default"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            icon={<ArrowLeftOutlined />}
          >
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
              className="bg-[#1a5683]"
              icon={<ArrowRightOutlined />}
            >
              Next
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" className="bg-[#1a5683]">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

// Step 1: Application Details Form
const ApplicationDetailsForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Application Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Form.Item
          name="campus"
          label="Select Campus"
          rules={[{ required: true, message: "Please select campus" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="main">Main Campus</Select.Option>
            <Select.Option value="north">North Campus</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="curriculum"
          label="Select Curriculum"
          rules={[{ required: true, message: "Please select curriculum" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="national">National Curriculum</Select.Option>
            <Select.Option value="cambridge">
              Cambridge Curriculum
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="language"
          label="Select Language"
          rules={[{ required: true, message: "Please select language" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="bengali">Bengali</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="academicSession"
          label="Select Academic Session"
          rules={[
            { required: true, message: "Please select academic session" },
          ]}
        >
          <Select placeholder="Select">
            <Select.Option value="2023-2024">2023-2024</Select.Option>
            <Select.Option value="2024-2025">2024-2025</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="shift"
          label="Select Shift"
          rules={[{ required: true, message: "Please select shift" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="morning">Morning</Select.Option>
            <Select.Option value="day">Day</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="class"
          label="Select Class"
          rules={[{ required: true, message: "Please select class" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="1">Class 1</Select.Option>
            <Select.Option value="2">Class 2</Select.Option>
            <Select.Option value="3">Class 3</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-[#1a5683]">
          Application Fee: 200 BDT
        </h3>
      </div>
    </div>
  );
};

// Step 2: Student Information Form
const StudentInformationForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="fullName"
          label="Full Name (As per birth certificate)"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: "Please enter date of birth" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item name="bloodGroup" label="Blood Group">
          <Select placeholder="Select">
            <Select.Option value="A+">A+</Select.Option>
            <Select.Option value="A-">A-</Select.Option>
            <Select.Option value="B+">B+</Select.Option>
            <Select.Option value="B-">B-</Select.Option>
            <Select.Option value="AB+">AB+</Select.Option>
            <Select.Option value="AB-">AB-</Select.Option>
            <Select.Option value="O+">O+</Select.Option>
            <Select.Option value="O-">O-</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="nationality"
          label="Nationality"
          rules={[{ required: true, message: "Please select nationality" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="bangladeshi">Bangladeshi</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="religion" label="Religion">
          <Select placeholder="Select">
            <Select.Option value="islam">Islam</Select.Option>
            <Select.Option value="hinduism">Hinduism</Select.Option>
            <Select.Option value="christianity">Christianity</Select.Option>
            <Select.Option value="buddhism">Buddhism</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="studentContact"
          label="Student Contact Number (If any)"
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="studentEmail" label="Student Email (If any)">
          <Input placeholder="username@email.com" />
        </Form.Item>
      </div>

      <h2 className="text-xl font-semibold text-[#1a5683] mt-8 mb-6">
        Address
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <Form.Item
          name="presentAddress"
          label="Present Address"
          rules={[{ required: true, message: "Please enter present address" }]}
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <div className="flex items-center gap-4 mb-4">
          <span>Permanent Address</span>
          <Form.Item name="sameAddress" valuePropName="checked" noStyle>
            <Select defaultValue="no" style={{ width: 200 }}>
              <Select.Option value="yes">Same as present address</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="permanentAddress"
          rules={[
            { required: true, message: "Please enter permanent address" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>

      <h2 className="text-xl font-semibold text-[#1a5683] mt-8 mb-6">
        Additional Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item name="siblings" label="Siblings in the same school (If any)">
          <Select defaultValue="no">
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select>
        </Form.Item>

        <div className="col-span-2"></div>

        <Form.Item
          name="medicalConditions"
          label="Medical conditions/allergies"
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item name="specialNeeds" label="Special needs requirements">
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item name="extracurricular" label="Extracurricular achievements">
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item name="references" label="References (If required)">
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>
    </div>
  );
};

// Step 3: Guardian Information Form
const GuardianInformationForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Father's Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="fatherName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter father's name" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="fatherContact"
          label="Contact Number"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="fatherOccupation"
          label="Occupation"
          rules={[{ required: true, message: "Please enter occupation" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="fatherIncome" label="Monthly Income">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="fatherEducation" label="Educational qualification">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="fatherNID"
          label="NID"
          rules={[{ required: true, message: "Please enter NID" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="fatherEmail" label="Email (optional)">
          <Input placeholder="Type here" />
        </Form.Item>

        <div className="col-span-2"></div>

        <Form.Item
          name="fatherAddress"
          label="Current Address"
          rules={[{ required: true, message: "Please enter current address" }]}
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item name="fatherOfficeAddress" label="Office Address">
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>

      <h2 className="text-xl font-semibold text-[#1a5683] mt-8 mb-6">
        Mother's Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="motherName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter mother's name" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="motherContact"
          label="Contact Number"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="motherOccupation"
          label="Occupation"
          rules={[{ required: true, message: "Please enter occupation" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="motherIncome" label="Monthly Income">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="motherEducation" label="Educational qualification">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="motherNID"
          label="NID"
          rules={[{ required: true, message: "Please enter NID" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="motherEmail" label="Email (optional)">
          <Input placeholder="Type here" />
        </Form.Item>

        <div className="col-span-2"></div>

        <Form.Item
          name="motherAddress"
          label="Current Address"
          rules={[{ required: true, message: "Please enter current address" }]}
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item name="motherOfficeAddress" label="Office Address">
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>

      <h2 className="text-xl font-semibold text-[#1a5683] mt-8 mb-6">
        Legal Guardian Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Form.Item
          name="legalGuardian"
          label="Legal Guardian"
          initialValue="father"
        >
          <Select>
            <Select.Option value="father">Father</Select.Option>
            <Select.Option value="mother">Mother</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="guardianName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter guardian's name" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="guardianContact"
          label="Contact Number"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="guardianNID"
          label="NID"
          rules={[{ required: true, message: "Please enter NID" }]}
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="guardianEmail" label="Email (optional)">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="guardianRelationship"
          label="Relationship with Student"
          rules={[{ required: true, message: "Please select relationship" }]}
        >
          <Select placeholder="Select">
            <Select.Option value="father">Father</Select.Option>
            <Select.Option value="mother">Mother</Select.Option>
            <Select.Option value="uncle">Uncle</Select.Option>
            <Select.Option value="aunt">Aunt</Select.Option>
            <Select.Option value="grandparent">Grandparent</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="guardianOccupation" label="Occupation">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="guardianAddress"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
          className="col-span-2"
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>
    </div>
  );
};

// Step 4: Previous School Form
const PreviousSchoolForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Previous School Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item name="previousSchool" label="Previous/Current School Name">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="transferCertificate"
          label="Transfer certificate number (If available)"
        >
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item name="boardCurriculum" label="Board/Curriculum Followed">
          <Select placeholder="Select">
            <Select.Option value="national">National Curriculum</Select.Option>
            <Select.Option value="cambridge">Cambridge</Select.Option>
            <Select.Option value="ib">IB</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="lastClass" label="Last Class Completed">
          <Select placeholder="Select">
            <Select.Option value="1">Class 1</Select.Option>
            <Select.Option value="2">Class 2</Select.Option>
            <Select.Option value="3">Class 3</Select.Option>
            <Select.Option value="4">Class 4</Select.Option>
            <Select.Option value="5">Class 5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="yearOfCompletion" label="Year of Completion">
          <Select placeholder="Select">
            <Select.Option value="2023">2023</Select.Option>
            <Select.Option value="2022">2022</Select.Option>
            <Select.Option value="2021">2021</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="result" label="Result / GPA / Grade">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="schoolAddress"
          label="School Address"
          className="col-span-2"
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>

        <Form.Item
          name="leavingReason"
          label="School Leaving Reason (If applicable)"
          className="col-span-2"
        >
          <Input.TextArea rows={3} placeholder="Type here" />
        </Form.Item>
      </div>
    </div>
  );
};

// Step 5: Document Upload Form
const DocumentUploadForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Document Upload
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Student's Recent Passport-Size Photo
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Student's Birth Certificate / NID
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Previous academic records/transcripts
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">Transfer certificate</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Character certificate (if required)
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">Father's NID/passport</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">Mother's NID/passport</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Legal Guardian's NID/passport (if applicable)
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Income certificate (if scholarship is being applied for)
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Medical certificate (if required)
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-base font-medium mb-4">
            Special needs documentation (if applicable)
          </h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-40">
            <div className="text-center">
              <p className="mb-2">
                Drag & drop files or{" "}
                <span className="text-[#1a5683]">Browse</span>
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF
              </p>
            </div>
          </div>
          <Button type="primary" className="mt-4 bg-[#1a5683]">
            Upload Files
          </Button>
        </div>
      </div>
    </div>
  );
};

// Step 6: Review and Submit Form
const ReviewSubmitForm = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1a5683] mb-6">
        Review & Submit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1a5683] mb-4">
            Student Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Personal Information</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Full Name (As per birth certificate)
                  </p>
                  <p className="text-sm">Mahin Muntasir</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm">Male</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-sm">20-07-2000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="text-sm">A+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="text-sm">Bangladeshi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Religion</p>
                  <p className="text-sm">Islam</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Student Contact Number (If any)
                  </p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Student Email (If any)
                  </p>
                  <p className="text-sm">12345678</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">Address</h4>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Present Address</p>
                  <p className="text-sm">Dikusha, Motijheel</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Permanent Address</p>
                  <p className="text-sm">Dikusha, Motijheel</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">Additional Information</h4>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Siblings in the same school (If any)
                  </p>
                  <p className="text-sm">N/A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Medical conditions/allergies
                  </p>
                  <p className="text-sm">N/A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Special needs requirements
                  </p>
                  <p className="text-sm">N/A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Extracurricular achievements
                  </p>
                  <p className="text-sm">N/A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    References (If required)
                  </p>
                  <p className="text-sm">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1a5683] mb-4">
            Guardian Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Father's Information</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-sm">Nickname Surname</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-sm">Businessman</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="text-sm">2,00,000 BDT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Educational Qualification
                  </p>
                  <p className="text-sm">Bsc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NID</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm">Bangladeshi</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Current Address</p>
                  <p className="text-sm">Dhaka, Bangladesh</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Office Address</p>
                  <p className="text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">Mother's Information</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-sm">Nickname Surname</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-sm">Businesswoman</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="text-sm">2,00,000 BDT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Educational Qualification
                  </p>
                  <p className="text-sm">Bsc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NID</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm">Bangladeshi</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Current Address</p>
                  <p className="text-sm">Dhaka, Bangladesh</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Office Address</p>
                  <p className="text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium">
                Legal Guardian Information
              </h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-sm">Nickname Surname</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">NID</p>
                  <p className="text-sm">12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm">Bangladeshi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Relationship with Student
                  </p>
                  <p className="text-sm">Islam</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-sm">Businesswoman</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1a5683] mb-4">
            Previous School Information
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">
                Previous/Current School Name
              </p>
              <p className="text-sm">Mahin Muntasir</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Transfer Certificate Number
              </p>
              <p className="text-sm">12345678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Board/Curriculum Followed</p>
              <p className="text-sm">Dhaka, NC</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Class Completed</p>
              <p className="text-sm">Class 8</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year of Completion</p>
              <p className="text-sm">2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Result / GPA / Grade</p>
              <p className="text-sm">12345678</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">School Address</p>
              <p className="text-sm">Motijheel, Dhaka</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                School Leaving Reason (If applicable)
              </p>
              <p className="text-sm">N/A</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-[#1a5683] mb-4">
            Document Upload
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">
                Student's Recent Passport-Size Photo
              </p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Birth Certificate / NID</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Previous academic records/transcripts
              </p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Transfer certificate</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Character certificate</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Father's NID</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mother's NID</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Legal Guardian's NID</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Income certificate</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Medical certificate</p>
              <p className="text-sm">file_name.pdf</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Special needs documentation
              </p>
              <p className="text-sm">file_name.pdf</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">
          By submitting this form, I confirm that all the information provided
          is accurate and complete. I understand that any false information may
          result in the rejection of this application or dismissal if admitted.
        </p>
        <Button type="primary" size="large" className="bg-[#1a5683] px-8">
          SUBMIT
        </Button>
      </div>
    </div>
  );
};
