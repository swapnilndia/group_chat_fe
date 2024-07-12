import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getGroupMessageAction,
  getPersonalMessageAction,
} from "../actions/chatAsyncActions";
import { Draft } from "immer";
import { MessageType } from "../../lib/types/message.types";

type InitialStateType = {
  personalMessageHistory: MessageType[];
  groupMessageHistory: MessageType[];
};

const initialState: InitialStateType = {
  personalMessageHistory: [],
  groupMessageHistory: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receivePersonalMessage: (
      state: Draft<InitialStateType>,
      action: PayloadAction<MessageType>
    ) => {
      console.log("hi from redux");
      if (state.personalMessageHistory) {
        state.personalMessageHistory.push(action.payload);
      } else {
        state.personalMessageHistory = [action.payload];
      }
    },
    receiveGroupMessage: (
      state: Draft<InitialStateType>,
      action: PayloadAction<MessageType>
    ) => {
      if (state.groupMessageHistory) {
        state.groupMessageHistory.push(action.payload);
      } else {
        state.groupMessageHistory = [action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalMessageAction.fulfilled, (state, action) => {
        state.personalMessageHistory = action.payload;
      })
      .addCase(getGroupMessageAction.fulfilled, (state, action) => {
        state.groupMessageHistory = action.payload;
      });
  },
});

export const { receivePersonalMessage, receiveGroupMessage } =
  chatSlice.actions;

export const selectPersonalMessages = (state: { chat: InitialStateType }) =>
  state.chat.personalMessageHistory;
export const selectGroupMessages = (state: { chat: InitialStateType }) =>
  state.chat.groupMessageHistory;

export default chatSlice.reducer;
