import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  searchUserAction,
  userContactsAction,
  userInfoAction,
} from "../actions/userAsyncActions";
import {
  Contact,
  SearchedUserDataType,
  UserContactListType,
} from "../../lib/types/user.types";

export type LoggedInUser = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

type InitialStateType = {
  isLoggedIn: boolean;
  userData: LoggedInUser | null;
  userContactList: null | UserContactListType;
  searchedUser: null | SearchedUserDataType;
  selectedContactId: null | number;
  selectedContactInfo: null | Contact;
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
  selectedContactInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selecteUserId: (state, action) => {
      state.selectedContactId = action.payload;
      if (state.userContactList) {
        const contactObj = state.userContactList.Contacts.filter(
          (contact) => contact.user_id === action.payload
        );
        state.selectedContactInfo = contactObj[0];
      }
    },
    deleteSelectedContactId: (state) => {
      state.selectedContactId = null;
      state.selectedContactInfo = null;
    },
    deleteSearchedContact: (state) => {
      state.searchedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
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
      state.userData = action.payload;
    });
    builder.addCase(userContactsAction.fulfilled, (state, action) => {
      state.userContactList = action.payload;
    });
    builder.addCase(searchUserAction.fulfilled, (state, action) => {
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
export const selectUserContactInfo = (state: { user: InitialStateType }) =>
  state.user.selectedContactInfo;
export const { selecteUserId, deleteSelectedContactId, deleteSearchedContact } =
  userSlice.actions;
export default userSlice.reducer;
