import { createSlice } from "@reduxjs/toolkit";
import {
  GroupDetailDataType,
  GroupListData,
  SearchUserType,
} from "../../lib/types/group.types";
import {
  getGroupInfoAction,
  getListOfGroupsAction,
  searchUserForGroupAction,
} from "../actions/groupAsyncAction";

type GroupInitialState = {
  listOfGroup: GroupListData | null;
  selectedGroupId: null | number;
  selectedGroupInfo: null | GroupDetailDataType;
  searchedUser: null | SearchUserType;
};

const initialState: GroupInitialState = {
  listOfGroup: null,
  selectedGroupId: null,
  selectedGroupInfo: null,
  searchedUser: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroupId = action.payload;
    },
    emptySearchedUser: (state) => {
      state.searchedUser = null;
    },
    deleteGroup: (state) => {
      state.selectedGroupId = null;
      state.selectedGroupInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfGroupsAction.fulfilled, (state, action) => {
      state.listOfGroup = action.payload;
    });
    builder.addCase(getGroupInfoAction.fulfilled, (state, action) => {
      state.selectedGroupInfo = action.payload;
    });
    builder.addCase(searchUserForGroupAction.fulfilled, (state, action) => {
      state.searchedUser = action.payload;
    });
  },
});

export const selectListOfGroup = (state: { group: GroupInitialState }) =>
  state.group.listOfGroup;
export const selectedGroupId = (state: { group: GroupInitialState }) =>
  state.group.selectedGroupId;
export const selectedGroupInfo = (state: { group: GroupInitialState }) =>
  state.group.selectedGroupInfo;
export const selectSearchUser = (state: { group: GroupInitialState }) =>
  state.group.searchedUser;
export const { selectGroup, emptySearchedUser, deleteGroup } =
  groupSlice.actions;
export default groupSlice.reducer;
