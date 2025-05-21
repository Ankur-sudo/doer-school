"use client";
// import { useAuth } from "@/contexts/AuthContext";
import { Link, useRouter } from "@/MUST_USE_IT_navigation";
import { Alert, Button, Grid, StepProps, Steps } from "antd";
import { useEffect, useState } from "react";
import { FaBlenderPhone } from "react-icons/fa";
import { MdDownloadDone, MdOutlineLockReset, MdSms } from "react-icons/md";
import LoginRegCard from "../components/LoginRegCard";
import OtpVerification from "../components/OtpVerification";
import ResetPassword from "../components/ResetPassword";
import SendOtp from "../components/SendOtp";
import { getDecryptedData } from "./lib/crypto/encryption";
import dayjs from "dayjs";

type Props = {};

export default function forgotPassword({}: Props) {
 
  return (
    <section className="bg-bg md:min-h-screen min-h-[70vh] flex justify-center items-center overflow-x-hidden">
      hello
    </section>
  );
}
