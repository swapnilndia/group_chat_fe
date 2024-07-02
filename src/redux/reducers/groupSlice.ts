import { createSlice } from "@reduxjs/toolkit";
import {
  GroupDetailDataType,
  GroupListData,
} from "../../lib/types/group.types";
import {
  getGroupInfoAction,
  getListOfGroupsAction,
} from "../actions/groupAsyncAction";

type GroupInitialState = {
  listOfGroup: GroupListData | null;
  selectedGroupId: null | number;
  selectedGroupInfo: null | GroupDetailDataType;
};

const initialState: GroupInitialState = {
  listOfGroup: null,
  selectedGroupId: null,
  selectedGroupInfo: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOfGroupsAction.fulfilled, (state, action) => {
      state.listOfGroup = action.payload;
    });
    builder.addCase(getGroupInfoAction.fulfilled, (state, action) => {
      state.selectedGroupInfo = action.payload;
    });
  },
});

export const selectListOfGroup = (state: { group: GroupInitialState }) =>
  state.group.listOfGroup;
export const selectedGroupId = (state: { group: GroupInitialState }) =>
  state.group.selectedGroupId;
export const selectedGroupInfo = (state: { group: GroupInitialState }) =>
  state.group.selectedGroupInfo;
export const { selectGroup } = groupSlice.actions;
export default groupSlice.reducer;
