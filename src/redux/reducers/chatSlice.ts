import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getGroupMessageAction,
  getPersonalMessageAction,
} from "../actions/chatAsyncActions";

type MessageType = {
  message_id: number;
  sender_id: number;
  receiver_id: number | null;
  group_id: number | null;
  message_type: "TEXT" | "IMAGE" | "VIDEO";
  content: string | null;
  media_id: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type InitialStateType = {
  personalMessageHistory: MessageType[] | null;
  groupMessageHistory: MessageType[] | null;
};
const initialState: InitialStateType = {
  personalMessageHistory: null,
  groupMessageHistory: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    receivePersonalMessage: (state, action: PayloadAction<MessageType>) => {
      if (state.personalMessageHistory) {
        state.personalMessageHistory.push(action.payload);
      } else {
        state.personalMessageHistory = [action.payload];
      }
    },
    receiveGroupMessage: (state, action: PayloadAction<MessageType>) => {
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
