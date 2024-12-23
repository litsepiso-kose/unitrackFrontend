import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STR_TOKEN } from "../helpers/common";
import { useAppSelector } from "./hooks";

export enum UserType {
  BASIC,
  PREMIUM,
}

// Define a type for the slice state
interface UserState {
  email?: string | null | undefined;
  voiceLanguage?: string | null | undefined;
  userType?: UserType | null | undefined;
}

// Define the initial state using that type
const initialState: UserState = {};

export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserState }>) => {
      state.voiceLanguage = action.payload.user.voiceLanguage;
      state.email = action.payload.user.email;
      state.userType = action.payload.user.userType;
    },
    signOut: () => {
      sessionStorage.removeItem(STR_TOKEN);
      window.location.href = "/";
    },
  },
});

export const useUser = (): UserState => {
  const data = useAppSelector((state) => state.user);

  return data;
};

export const { setUser, signOut } = UserSlice.actions;

export default UserSlice.reducer;
