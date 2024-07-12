import { useEffect, useState } from "react";
import { apiHelperFunction } from "../utils/apiHelper";

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
const Base_url = import.meta.env.VITE_BASE_URL;
const useFetchChats = () => {
  const [chat, setChat] = useState<ChatlistType>(null);

  const fetchChat = async () => {
    const response: ChatlistResponseType = await apiHelperFunction({
      method: "GET",
      url: `${Base_url}/chat/get-chatlist`,
      includeAuth: true,
    });
    console.log(response);
    if (response.status === 200) {
      setChat(response.data);
    }
  };
  useEffect(() => {
    if (chat === null) {
      fetchChat();
    }
  }, []);
  return chat;
};

export default useFetchChats;
