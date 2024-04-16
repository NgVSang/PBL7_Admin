import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import { RootState } from "../store";

export type AuthState = {
  loggedin: boolean;
  user?: IUser;
};

const initialState: AuthState = {
  loggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.loggedin = true;
      state.user = action.payload;
    },
    logout: (state, action: PayloadAction) => {
      state.loggedin = false;
      state.user = undefined;
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
