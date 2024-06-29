import { createSlice } from "@reduxjs/toolkit";
import { getAllMessageAction } from "../actions/chatAsyncActions";
type ChatlistType =
  | {
      id: number;
      message: string;
      createdAt: string;
      updatedAt: string;
      userName: string;
      userId: number;
    }[]
  | null;

type InitialStateType = {
  chatList: ChatlistType;
};
const initialState: InitialStateType = {
  chatList: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMessageAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.chatList = action.payload;
    });
  },
});

export const selectChatlist = (state: { chat: InitialStateType }) =>
  state.chat.chatList;
export default chatSlice.reducer;
