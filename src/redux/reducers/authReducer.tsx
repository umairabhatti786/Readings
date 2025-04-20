import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  isLogin: boolean;
}
export const initialState: AuthState = {
  isLogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLogin: (state, { payload }: PayloadAction<any>) => {
      state.isLogin = payload;
    },
  },
});

export const { setUserLogin } = authSlice.actions;
export default authSlice.reducer;
export const getIslogin = (state: RootState) => state?.auth.isLogin;
