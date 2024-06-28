import axios, { AxiosRequestConfig, Method } from "axios";

interface ApiHelperOptions {
  method: Method;
  url: string;
  headers?: Record<string, string>;
  data?: unknown;
  includeAuth?: boolean; // New flag to indicate whether to include the auth token
}

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/refresh",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    const { accessToken } = response.data.data;
    localStorage.setItem("token", JSON.stringify(accessToken));
    return accessToken;
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
};

const handleLogout = () => {
  console.log("loggedout");
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const handleTokenRefresh = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      addRefreshSubscriber((token: string) => resolve(token));
    });
  }

  isRefreshing = true;
  try {
    const newToken = await refreshToken();
    isRefreshing = false;
    onRefreshed(newToken);
    return newToken;
  } catch (error) {
    isRefreshing = false;
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (config.headers && config.headers.includeAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
      delete config.headers.includeAuth; // Remove custom header property before sending the request
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await handleTokenRefresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (
          axios.isAxiosError(refreshError) &&
          refreshError.response?.status === 403
        ) {
          handleLogout(); // Logout if refresh token is expired
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const apiHelperFunction = async <T>(
  options: ApiHelperOptions
): Promise<T> => {
  const { method, url, headers, data, includeAuth } = options;

  const requestOptions: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(includeAuth && { includeAuth: "true" }), // Add includeAuth flag conditionally
    },
    withCredentials: true,
    data,
  };

  try {
    const response = await api(requestOptions);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.message || error.message;
      alert(errorMsg);
      throw new Error(errorMsg);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
