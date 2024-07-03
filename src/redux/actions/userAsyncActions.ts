import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginInfoType } from "../../lib/types";
import { UserService } from "../services/userService";

export const loginAction = createAsyncThunk<string, LoginInfoType>(
  "loginAction",
  async ({ email, password }: LoginInfoType) => {
    const response = await UserService.userLogin({ email, password });

    if (response && response.accessToken) {
      window.location.href = "/";
      return response.accessToken;
    }
    throw new Error("Login failed");
  }
);
export const logoutAction = createAsyncThunk("logoutAction", async () => {
  console.log("first");
  const response = await UserService.userLogout();
  if (response) {
    return response;
  }
  throw new Error("Logout failed");
});

export const userInfoAction = createAsyncThunk("userInfoAction", async () => {
  const response = await UserService.userInfo();
  if (response && response.userInfo) {
    return response.userInfo;
  }
  throw new Error("User info retrieval failed");
});
