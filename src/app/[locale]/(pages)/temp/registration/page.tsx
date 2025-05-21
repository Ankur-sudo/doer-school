"use client";
import InDatePicker from "@/components/common/FormItems/InDatePicker";
import InPassword from "@/components/common/FormItems/InPassword";
import InSelect from "@/components/common/FormItems/InSelect";
import InText from "@/components/common/FormItems/InText";
import { useMessageGroup } from "@/contexts/MessageGroup";
import {
  rule_bangladesh_mobile,
  rule_confirmPassword,
  rule_numeric,
  rule_required,
} from "@/utils/rules/formRules";
import { Button, Col, Form, Row } from "antd";
import { useEffect } from "react";
import LoginRegCard from "../components/LoginRegCard";
import { useRegistrationMutation } from "./lib/api/regApi";
import { IRegistrationForm } from "./lib/types";
import dayjs from "dayjs";
import InMobileWithVerify from "@/components/common/FormItems/InMobileWithVerify";

type Props = {};

export default function Page_Registration({}: Props) {
  const [form] = Form.useForm();
  const [loginPost, { isError, isLoading, isSuccess, error, data }] =
    useRegistrationMutation();
  const { notify } = useMessageGroup();

  useEffect(() => {
    notify({
      isError,
      isLoading,
      isSuccess,
      key: "login-Message-Group",
      error,
      success_content: "Successfully registered login now!",
      success_url: "/login",
    });
  }, [isError, isLoading, isSuccess, error]);

  return (
    <section className="bg-bg min-h-screen flex justify-center items-center">
      <div className="">
        <LoginRegCard isLogin={false}>
          <Form
            form={form}
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={(values) => {
              delete values.password_confirm;
              loginPost(values);
            }}
            layout="vertical"
            className="!pt-[40px]"
            size="large"
          >
            <Row gutter={[16, 16]}>
              {/* <Divider orientation="left">Product-info</Divider> */}
              <InText<IRegistrationForm>
                name={["fullName"]}
                label="Full Name"
                rules={[rule_required()]}
                placeholder="Enter full name"
                bPoint={{
                  xs: 24,
                }}
              />
              <InText<IRegistrationForm>
                name={["email"]}
                label="Email"
                rules={[]}
                type="email"
                placeholder="Enter email"
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
              />
              <InMobileWithVerify<IRegistrationForm>
                name={["mobileNumber"]}
                label="Mobile Number"
                rules={[rule_bangladesh_mobile(), rule_required()]}
                placeholder="Enter mobile number"
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
                form={form}
              />
              <InSelect<IRegistrationForm>
                name={["gender"]}
                label="Gender"
                rules={[rule_required()]}
                placeholder="Enter gender"
                values={[
                  { value: "MALE", title: "Male" },
                  { value: "FEMALE", title: "Female" },
                  { value: "OTHER", title: "Other" },
                ]}
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
              />
              <InDatePicker<IRegistrationForm>
                name={["dob"]}
                label="Date of Birth"
                rules={[rule_required()]}
                placeholder="Enter date of birth"
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
                end={dayjs()}
                start={dayjs().subtract(200, "years")}
              />
              <InPassword<IRegistrationForm>
                name={["password"]}
                label="Password"
                rules={[rule_required()]}
                placeholder="Enter password"
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
              />
              <InPassword<IRegistrationForm>
                name={["password_confirm"]}
                label="Confirm Password"
                rules={[rule_confirmPassword("password"), rule_required()]}
                placeholder="Enter password"
                bPoint={{
                  xs: 24,
                  sm: 24,
                  lg: 12,
                  md: 12,
                  xl: 12,
                  xxl: 12,
                }}
              />
              {/* <Col xs={24}>
                <Form.Item<IRegistrationForm> name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree to the{" "}
                    <Link className="text-button" href={"#"}>
                      terms and conditions
                    </Link>{" "}
                    of the policy
                  </Checkbox>
                </Form.Item>
              </Col> */}
              <Col xs={24}>
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
                    Registration
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </LoginRegCard>
      </div>
    </section>
  );
}
