import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginInfoType } from "../../lib/types";
import { UserService } from "../services/userService";
import { SearchUserResponseType } from "../../lib/types/group.types";
import { GroupService } from "../services/groupService";

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
export const userContactsAction = createAsyncThunk(
  "userContactsAction",
  async () => {
    const response = await UserService.getContactList();
    if (response) {
      return response;
    }
    throw new Error("User info retrieval failed");
  }
);
export const addUserToContactAction = createAsyncThunk(
  "addUserToContactAction",
  async ({ contact_user_id }: { contact_user_id: number }, thunkAPI) => {
    const response = await UserService.addUserToContactList({
      contact_user_id,
    });
    if (response) {
      thunkAPI.dispatch(userContactsAction());
      return response;
    }
    throw new Error("User info retrieval failed");
  }
);
export const removeUserFromContactAction = createAsyncThunk(
  "removeUserFromContactAction",
  async ({ contact_user_id }: { contact_user_id: number }, thunkAPI) => {
    const response = await UserService.removeUserFromContactList({
      contact_user_id,
    });
    if (response) {
      thunkAPI.dispatch(userContactsAction());
      return response;
    }
    throw new Error("User info retrieval failed");
  }
);

export const searchUserAction = createAsyncThunk(
  "searchUserAction",
  async ({ email, phone }: { email: string; phone: string }) => {
    const response: SearchUserResponseType = await GroupService.searchUserGroup(
      { email, phone }
    );
    if (response) {
      return response.data;
    }
    throw new Error("Search User failed");
  }
);
