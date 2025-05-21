import { apiSlice } from "@/lib/api/apiSlice";
import { ILoginForm } from "../../../login/lib/types/loginTypes";
import { IRegistrationResponse } from "../types";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<IRes<IRegistrationResponse>, ILoginForm>({
      query: (data) => ({
        url: "/client/user/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationMutation } = userApi;
