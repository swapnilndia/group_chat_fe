import { apiHelperFunction } from "../../utils/apiHelper";

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

class chatService {
  static getInstance() {
    return new chatService();
  }

  sendPersonalTextMessage = async ({
    receiver_id,
    content,
  }: SendPersonalMessageType) => {
    try {
      const response: SendMessageResponse = await apiHelperFunction({
        method: "POST",
        url: "http://localhost:3000/api/v1/messages/personal",
        data: { receiver_id, content },
        includeAuth: true,
      });
      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  sendGroupTextMessage = async ({
    group_id,
    content,
  }: SendGroupMessageType) => {
    try {
      const response: SendMessageResponse = await apiHelperFunction({
        method: "POST",
        url: "http://localhost:3000/api/v1/messages/group",
        data: { group_id, content },
        includeAuth: true,
      });
      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getPersonalMessageHistory = async ({ contactId }: { contactId: number }) => {
    try {
      const response: GetMessageHistoryResponse = await apiHelperFunction({
        method: "GET",
        url: `http://localhost:3000/api/v1/messages/personal/history/${contactId}`,
        data: {},
        includeAuth: true,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getGroupMessageHistory = async ({ groupId }: { groupId: number }) => {
    try {
      const response: GetMessageHistoryResponse = await apiHelperFunction({
        method: "GET",
        url: `http://localhost:3000/api/v1/messages/group/history/${groupId}`,
        data: {},
        includeAuth: true,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const ChatService = chatService.getInstance();
