"use client";
import { useMessageGroup } from "@/contexts/MessageGroup";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import LoginRegCard from "../components/LoginRegCard";
import { useLoginMutation } from "./lib/api/loginApi";
import { getDecryptedData } from "./lib/crypto/encryption";
import { useRouter } from "@/MUST_USE_IT_navigation";
type FieldType = {
  emailOrMobile?: string;
  password?: string;
};

type Props = {};

export default function Page_Login({}: Props) {


  return (
    <section className="bg-bg md:min-h-screen min-h-[70vh] flex justify-center items-center">
      hello
    </section>
  );
}
