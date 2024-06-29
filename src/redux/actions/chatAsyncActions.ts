import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatService } from "../services/chatService";

export const sendMessageAction = createAsyncThunk(
  "sendMessageAction",
  async ({ message }: { message: string }, thunkAPI) => {
    const response = await ChatService.sendMessage({ message });

    if (response?.status === 201) {
      thunkAPI.dispatch(getAllMessageAction());
      return response;
    }
    throw new Error("Login failed");
  }
);

export const getAllMessageAction = createAsyncThunk(
  "getAllMessageAction",
  async () => {
    const response = await ChatService.getAllMessages();
    if (response) {
      console.log(response);
      return response.data;
    }
    throw new Error("Login failed");
  }
);
