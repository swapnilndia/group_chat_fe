import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../services/chatService";

type MediumType = {
  media_id: number;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_by: number;
  file_key: string;
};

type MessageType = {
  message_id: number;
  sender_id: number;
  sender_name: string;
  receiver_id: number | null;
  group_id: number | null;
  message_type: "TEXT" | "IMAGE" | "VIDEO";
  content: string | null;
  media_id: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  Medium: MediumType | null;
};

type SendPersonalMessageType = {
  receiver_id: number;
  content: string;
};
type SendGroupMessageType = {
  group_id: number;
  content: string;
};

type SendMessageResponse = {
  status: number;
  message: string;
  data: MessageType;
};

type GetMessageHistoryResponse = {
  status: number;
  message: string;
  data: MessageType[];
};

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
export const sendGroupMessageAction = createAsyncThunk(
  "sendGroupMessageAction",
  async ({ group_id, content }: SendGroupMessageType, thunkAPI) => {
    const response: SendMessageResponse | undefined =
      await ChatService.sendGroupTextMessage({
        group_id,
        content,
      });

    if (response?.status === 201) {
      thunkAPI.dispatch(getGroupMessageAction({ groupId: group_id }));
      return response;
    }
    throw new Error("Failed to send group message");
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
