import { LoginInfoType, SignupInfoType } from "../../lib/types";
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
}

export const UserService = userService.getInstance();
