import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserProfile {
  sub: string;
  name: string;
  email: string;
  given_name: string;
  family_name: string;
}

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  sessionState: string | null;
  expiresAt: number | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  sessionState: null,
  expiresAt: null,
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
        sessionState: string;
        expiresIn: number;
        profile: UserProfile;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.sessionState = action.payload.sessionState;
      state.expiresAt = Date.now() + action.payload.expiresIn * 1000;
      state.profile = action.payload.profile;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.sessionState = null;
      state.expiresAt = null;
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, logout, setLoading, setError } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.profile;
export const selectIsLoggedIn = (state: RootState) => !!state.user.accessToken;

export default userSlice.reducer;
