import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  searchUserAction,
  userContactsAction,
  userInfoAction,
} from "../actions/userAsyncActions";
import {
  SearchedUserDataType,
  UserContactListType,
} from "../../lib/types/user.types";

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
  userContactList: null | UserContactListType;
  searchedUser: null | SearchedUserDataType;
  selectedContactId: null | number;
};

type AccessTokenType = string | null;

const accessTokenCheck: AccessTokenType | null = (() => {
  const data = localStorage.getItem("token");
  return data ? (JSON.parse(data) as AccessTokenType) : null;
})();

const initialState: InitialStateType = {
  isLoggedIn: accessTokenCheck ? true : false,
  userData: null,
  userContactList: null,
  searchedUser: null,
  selectedContactId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selecteUserId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    deleteSelectedContactId: (state) => {
      state.selectedContactId = null;
    },
    deleteSearchedContact: (state) => {
      state.searchedUser = null;
    },
  },
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
    builder.addCase(userContactsAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userContactList = action.payload;
    });
    builder.addCase(searchUserAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.searchedUser = action.payload;
    });
  },
});
export const selectUserInfo = (state: { user: InitialStateType }) =>
  state.user.userData;
export const selectLoggedInStatus = (state: { user: InitialStateType }) =>
  state.user.isLoggedIn;
export const selectUserContact = (state: { user: InitialStateType }) =>
  state.user.userContactList;
export const selectSearchedContact = (state: { user: InitialStateType }) =>
  state.user.searchedUser;
export const selectUserContactId = (state: { user: InitialStateType }) =>
  state.user.selectedContactId;

export const { selecteUserId, deleteSelectedContactId, deleteSearchedContact } =
  userSlice.actions;
export default userSlice.reducer;
