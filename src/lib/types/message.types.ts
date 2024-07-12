type MediumType = {
  media_id: number;
  file_name: string;
  file_type: string;
  file_size: number;
  uploaded_by: number;
  file_key: string;
};

export type MessageType = {
  message_id: number;
  sender_id: number;
  sender_name: string;
  receiver_id: number | null;
  group_id: number | null;
  message_type: string;
  content: string | null;
  media_id: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  Medium: MediumType | null;
};

export type SendPersonalMessageType = {
  receiver_id: number;
  content: string;
};
export type SendGroupMessageType = {
  group_id: number;
  content: string;
};

export type SendMessageResponse = {
  status: number;
  message: string;
  data: MessageType;
};

export type GetMessageHistoryResponse = {
  status: number;
  message: string;
  data: MessageType[];
};
