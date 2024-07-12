import {
  GetMessageHistoryResponse,
  SendGroupMessageType,
  SendMessageResponse,
  SendPersonalMessageType,
} from "../../lib/types/message.types";
import { apiHelperFunction } from "../../utils/apiHelper";
const Base_url = import.meta.env.VITE_BASE_URL;
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
        url: `${Base_url}/messages/personal`,
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
        url: `${Base_url}/messages/group`,
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
        url: `${Base_url}/messages/personal/history/${contactId}`,
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
        url: `${Base_url}/messages/group/history/${groupId}`,
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
