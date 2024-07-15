import {
  AddContactResponseType,
  ContactListResponseType,
  LoginInfoType,
  RemoveContactResponseType,
  SignupInfoType,
} from "../../lib/types/user.types";
import { apiHelperFunction } from "../../utils/apiHelper";
type UserInfo = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

type UserData = {
  userInfo: UserInfo;
};

type UserInfoResponse = {
  status: number;
  message: string;
  data: UserData;
};
type UserSignupResponse = {
  status: number;
  message: string;
  data: Record<string, never>; // Empty object
};

type UserLoginResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

class userService {
  static getInstance() {
    return new userService();
  }
  userSignup = async ({ name, email, phone, password }: SignupInfoType) => {
    const data = JSON.stringify({ name, email, phone, password });
    try {
      const response: UserSignupResponse = await apiHelperFunction({
        method: "POST",
        url: "user/signup",
        includeAuth: false,
        data: data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  userLogin = async ({ email, password }: LoginInfoType) => {
    const data = JSON.stringify({ email, password });
    try {
      const response: UserLoginResponse = await apiHelperFunction({
        method: "POST",
        url: "user/signin",
        includeAuth: false,
        data: data,
      });
      if (response.status === 200) {
        // window.location.href = "/";

        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  userLogout = async () => {
    try {
      const response = await apiHelperFunction({
        method: "POST",
        url: "user/signout",
        includeAuth: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  userInfo = async () => {
    try {
      const response: UserInfoResponse = await apiHelperFunction({
        method: "GET",
        url: "user/userinfo",
        includeAuth: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  getContactList = async () => {
    try {
      const response: ContactListResponseType = await apiHelperFunction({
        method: "GET",
        url: "/contact/contact-list",
        includeAuth: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  addUserToContactList = async ({
    contact_user_id,
  }: {
    contact_user_id: number;
  }) => {
    try {
      const response: AddContactResponseType = await apiHelperFunction({
        method: "POST",
        url: "/contact/add-contact",
        includeAuth: true,
        data: {
          contact_user_id: contact_user_id,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  removeUserFromContactList = async ({
    contact_user_id,
  }: {
    contact_user_id: number;
  }) => {
    try {
      const response: RemoveContactResponseType = await apiHelperFunction({
        method: "DELETE",
        url: "/contact/remove-contact",
        includeAuth: true,
        data: {
          contact_user_id: contact_user_id,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export const UserService = userService.getInstance();
