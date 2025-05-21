// hooks/useAuth.ts
"use client";

import { useRouter } from "next/navigation";
import { logout, selectIsLoggedIn, selectUser } from "../slices/authSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionState");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("profile");
    dispatch(logout());
    // router.push("/login");
  };

  return { user, isLoggedIn, logout: handleLogout };
}
