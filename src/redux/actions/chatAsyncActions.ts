import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../services/chatService";
import {
  GetMessageHistoryResponse,
  SendMessageResponse,
  SendPersonalMessageType,
} from "../../lib/types/message.types";

export const sendPersonalMessageAction = createAsyncThunk(
  "sendPersonalMessageAction",
  async ({ receiver_id, content }: SendPersonalMessageType, thunkAPI) => {
    const response: SendMessageResponse | undefined =
      await ChatService.sendPersonalTextMessage({
        receiver_id,
        content,
      });

    if (response?.status === 201) {
      thunkAPI.dispatch(getPersonalMessageAction({ contactId: receiver_id }));
      return response;
    }
    throw new Error("Failed to send personal message");
  }
);

export const getPersonalMessageAction = createAsyncThunk(
  "getPersonalMessageAction",
  async ({ contactId }: { contactId: number }) => {
    const response: GetMessageHistoryResponse | undefined =
      await ChatService.getPersonalMessageHistory({
        contactId,
      });
    if (response?.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch personal message history");
  }
);
export const getGroupMessageAction = createAsyncThunk(
  "getGroupMessageAction",
  async ({ groupId }: { groupId: number }) => {
    const response: GetMessageHistoryResponse | undefined =
      await ChatService.getGroupMessageHistory({
        groupId,
      });

    if (response?.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch group message history");
  }
);
