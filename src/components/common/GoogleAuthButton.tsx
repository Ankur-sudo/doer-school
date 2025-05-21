"use client";

import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const apiUrl =
        "http://192.168.0.69:3000/api/v1/doer/admission/google/auth";

      // Hit your backend endpoint that returns the Google redirect URL
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Forwarded-Host": "doer-admission.com",
        },
      });

      if (response) {
        const data = await response.json();

        console.log({ data });

        if (data?.redirectUrl) {
          // Redirect the user to Google's OAuth screen
          window.location.href = data.redirectUrl;
        } else {
          throw new Error("Redirect URL missing in response");
        }
      } else {
        throw new Error("Failed to fetch Google redirect URL");
      }
    } catch (error) {
      console.error("Error initiating Google authentication:", error);
      setLoading(false);
    }
  };

  return (
    <a href="http://192.168.0.69:3000/api/v1/doer/admission/google/auth?host=doer-admission.com">
      <Button
        icon={<GoogleOutlined />}
        className="w-full h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-neutral-200 border-gray-200 dark:border-neutral-800"
        //   onClick={handleGoogleSignIn}
        loading={loading}
      >
        Sign in with Google
      </Button>
    </a>
  );
}
