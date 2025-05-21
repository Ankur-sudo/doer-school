import { apiSlice } from "@/lib/api/apiSlice";
import {
  ILoginForm,
  ILoginResponse,
  IUserGetType,
  IUserUpdate,
} from "../types/loginTypes";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginForm>({
      query: (data) => ({
        url: "/client/user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query<IResWithOutFilter<IUserGetType>, { uuid: string }>({
      query: (data) => ({
        url: "/client/user/fetch-by-uuid",
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<ILoginResponse, FormData>({
      query: (data) => ({
        url: "/client/user/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// https://bb-admin.beemabox.celloscope.net/api/client/product/fetch
export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation } =
  userApi;
