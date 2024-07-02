import { apiHelperFunction } from "../../utils/apiHelper";
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

type ChatlistResponseType = {
  status: number;
  message: string;
  data: ChatlistType;
};

type SendMessageType = {
  message: string;
};

type SendMessageResponse = {
  status: number;
  message: string;
  data: unknown;
};

class chatService {
  static getInstance() {
    return new chatService();
  }

  sendMessage = async ({ message }: SendMessageType) => {
    try {
      const response: SendMessageResponse = await apiHelperFunction({
        method: "POST",
        url: "http://localhost:3000/api/v1/message/new-message",
        data: { message },
        includeAuth: true,
      });
      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllMessages = async () => {
    try {
      const response: ChatlistResponseType = await apiHelperFunction({
        method: "GET",
        url: "http://localhost:3000/api/v1/message/get-messagelist",
        includeAuth: true,
      });
      console.log(response);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const ChatService = chatService.getInstance();
