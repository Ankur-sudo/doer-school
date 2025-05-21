import { apiSlice } from "@/lib/api/apiSlice";
import {
  ILoginForm,
  ILoginResponse,
  IUserGetType,
  IUserUpdate,
} from "../types/loginTypes";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOtp: builder.mutation<{ message: string }, { emailOrMobile: string }>({
      query: (data) => ({
        url: "/client/user/send-opt",
        method: "POST",
        body: data,
      }),
    }),
    getOtpForgotPassword: builder.mutation<
      { message: string },
      { emailOrMobile: string }
    >({
      query: (data) => ({
        url: "/client/user/send-opt-forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    otpConfirm: builder.mutation<
      { message: string },
      { emailOrMobile: string; otp: number }
    >({
      query: (data) => ({
        url: "/client/user/confirm-otp",
        method: "POST",
        body: data,
      }),
    }),
    changePass: builder.mutation<
      { message: string },
      { emailOrMobile: string; newPassword: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: "/client/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// https://bb-admin.beemabox.celloscope.net/api/client/product/fetch
export const {
  useGetOtpMutation,
  useGetOtpForgotPasswordMutation,
  useOtpConfirmMutation,
  useChangePassMutation,
} = userApi;
