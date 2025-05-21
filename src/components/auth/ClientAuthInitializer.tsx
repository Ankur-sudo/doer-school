// components/ClientAuthInitializer.tsx
"use client";

import { logout, setUser } from "@/lib/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function ClientAuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserFromStorage = () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const sessionState = localStorage.getItem("sessionState");
      const expiresAt = localStorage.getItem("expiresAt");
      const profile = localStorage.getItem("profile");

      if (accessToken && sessionState && expiresAt && profile) {
        const expiresAtNum = parseInt(expiresAt);
        if (Date.now() < expiresAtNum) {
          dispatch(
            setUser({
              accessToken,
              refreshToken: refreshToken || undefined,
              sessionState,
              expiresIn: (expiresAtNum - Date.now()) / 1000,
              profile: JSON.parse(profile),
            })
          );
        } else {
          dispatch(logout());
        }
      }
    };

    loadUserFromStorage();
  }, [dispatch]);

  return null;
}
