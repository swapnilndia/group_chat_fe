export type Contact = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  Contact: {
    contact_id: number;
    connectionKey: string;
    status: string;
  };
};

export type UserContactListType = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  Contacts: Contact[];
};

export type ContactListResponseType = {
  status: number;
  message: string;
  data: UserContactListType;
};
export type RemoveContactResponseType = {
  status: number;
  message: string;
  data: number;
};
export type AddContactResponseType = {
  status: number;
  message: string;
  data: {
    status: string;
    contact_id: number;
    contact_user_id: number;
    user_id: number;
    updatedAt: string;
    createdAt: string;
  };
};
export type SearchedUserDataType = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};
export type SearchedUserResponseType = {
  status: number;
  message: string;
  data: SearchedUserDataType;
};
export type LoggedInUser = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};
export type SignupInfoType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
export type LoginInfoType = {
  email: string;
  password: string;
};
