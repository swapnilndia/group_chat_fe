import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  userInfoAction,
} from "../actions/userAsyncActions";

type InitialStateType = {
  isLoggedIn: boolean;
  userData: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

type AccessTokenType = string | null;

const accessTokenCheck: AccessTokenType | null = (() => {
  const data = localStorage.getItem("token");
  return data ? (JSON.parse(data) as AccessTokenType) : null;
})();

const initialState: InitialStateType = {
  isLoggedIn: accessTokenCheck ? true : false,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      console.log(action.payload);
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
    builder.addCase(userInfoAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userData = action.payload;
    });
  },
});
export const selectUserInfo = (state: { user: InitialStateType }) =>
  state.user.userData;
export const selectLoggedInStatus = (state: { user: InitialStateType }) =>
  state.user.isLoggedIn;
export default userSlice.reducer;
