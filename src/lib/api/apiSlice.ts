import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tags from "../tags";
import {
  getDecryptedData,
  setEncryptedData,
} from "@/app/[locale]/(pages)/temp/login/lib/crypto/encryption";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { message } from "antd";

export const BASE_URL_DEV = process.env.NEXT_PUBLIC_BASE_URL;

// Create base query with automatic token inclusion
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_DEV,
  prepareHeaders: (headers, { getState }) => {
    const token = getDecryptedData("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Add re-authentication handling for 403 errors
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 (Unauthorized) status
  if (result.meta?.response?.status === 401) {
    const token = getDecryptedData("token");
    const sessionId = getDecryptedData("sessionId"); // Ensure you store sessionId securely
    const refreshToken = getDecryptedData("refreshToken"); // Ensure you store sessionId securely

    // Attempt to refresh the token
    const refreshResponse: any = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { sessionId, refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResponse.meta?.response?.status === 200) {
      // Successfully refreshed token, update token and retry request
      const newToken = refreshResponse?.data?.accessToken;

      // Store the new token securely
      setEncryptedData("token", newToken, 1);
      // Cookies.set("refreshToken", refreshResponse.data.refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      // Both access token and refresh token are invalid, logout user
      message.error("Session expired. Please log in again.");
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("sessionId");
      localStorage.removeItem("userData");
      window.location.href = "/en/login";
    }
  }

  return result;
};

// Define the API slice with re-authentication logic
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: tags,
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getSetting: builder.query<
      IRes<{
        title: string;
        config: any;
      }>,
      { title: TSettingsTitle }
    >({
      query: (data) => ({
        url: "/client/setting/fetch-by-title",
        method: "POST",
        body: data,
      }),
      providesTags: ["Settings"],
    }),
    getInsurer: builder.query<
      IRes<
        {
          insurerClaimUrl: string;
          insurerName: string;
          insurerLogo: any;
        }[]
      >,
      void
    >({
      query: (data) => ({
        url: "/admin/insurer/fetch",
        method: "POST",
        body: data,
      }),
      providesTags: ["Insurer"],
    }),
    getDivision: builder.query<IRes<IDistrict[]>, IGetProps>({
      query: (data) => ({
        url: "/client/division/fetch",
        method: "POST",
        body: data,
      }),
      providesTags: ["Division"],
    }),
    getDistrict: builder.query<IRes<IDistrict[]>, IGetProps>({
      query: (data) => ({
        url: "/client/district/fetch",
        method: "POST",
        body: data,
      }),
      providesTags: ["District"],
    }),
    getThana: builder.query<IRes<IDistrict[]>, IGetProps>({
      query: (data) => ({
        url: "/client/thana/fetch",
        method: "POST",
        body: data,
      }),
      providesTags: ["Thana"],
    }),
  }),
});

export const {
  useGetSettingQuery,
  useGetInsurerQuery,
  useGetDivisionQuery,
  useGetDistrictQuery,
  useGetThanaQuery,
} = apiSlice;

/*

// lib/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { setUser, logout } from '@/features/userSlice';

const mutex = new Mutex();
const BASE_URL_DEV = "http://localhost:8080"; // Adjust as needed

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_DEV,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = api.getState().user.refreshToken;
        const sessionState = api.getState().user.sessionState;

        if (refreshToken && sessionState) {
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh',
              method: 'POST',
              body: { sessionId: sessionState, refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn } = refreshResult.data;
            const profile = api.getState().user.profile;

            localStorage.setItem("accessToken", newAccessToken);
            if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
            localStorage.setItem("expiresAt", String(Date.now() + expiresIn * 1000));

            api.dispatch(
              setUser({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                sessionState,
                expiresIn,
                profile,
              })
            );

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
          }
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

*/
