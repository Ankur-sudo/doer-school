"use client";

import { setUser } from "@/lib/slices/authSlice";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const sessionState = params.get("session_state");
        const expiresIn = params.get("expires_in");

        if (!accessToken || !sessionState || !expiresIn) {
          setError("Authentication failed: missing tokens");
          setLoading(false);
          return;
        }

        const parts = accessToken.split(".");
        if (parts.length !== 3) {
          throw new Error("Invalid JWT format");
        }

        const payload = JSON.parse(atob(parts[1]));
        const profile = {
          sub: payload.sub,
          name: payload.name,
          email: payload.email,
          given_name: payload.given_name,
          family_name: payload.family_name,
        };

        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("sessionState", sessionState);
        localStorage.setItem(
          "expiresAt",
          String(Date.now() + parseInt(expiresIn) * 1000)
        );
        localStorage.setItem("profile", JSON.stringify(profile));

        dispatch(
          setUser({
            accessToken,
            refreshToken: refreshToken || undefined,
            sessionState,
            expiresIn: parseInt(expiresIn),
            profile,
          })
        );

        router.push("/en/");
      } catch (err) {
        console.error("Error processing auth callback:", err);
        setError("Authentication failed. Please try again.");
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, dispatch]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 text-xl font-medium mb-4">{error}</div>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-[#1a5683] text-white rounded hover:bg-[#134b75]"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="!min-h-screen w-full flex flex-col items-center justify-center">
      <Spin size="large" />
      <div className="mt-4 text-lg text-[#1a5683]">
        Completing authentication...
      </div>
    </div>
  );
}
