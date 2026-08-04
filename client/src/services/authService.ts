import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/users`;

const authApi = axios.create({
  baseURL: API,
});

export default authApi;

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export const login = async (
  data: LoginData
) => {
  const res = await authApi.post(
    "/login",
    data
  );

  return res.data;
};

export const register = async (
  data: RegisterData
) => {
  const res = await authApi.post(
    "/register",
    data
  );

  return res.data;
};

export const getProfile = async (
  token: string
) => {
  const res = await authApi.get(
    "/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export type UpdateProfileData = {
  username: string;
  avatar?: string;
  bio?: string;
};

export const updateProfile = async (
  data: UpdateProfileData,
  token: string
) => {
  const res = await authApi.put(
    "/profile",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (
  data: ChangePasswordData,
  token: string
) => {
  const res = await authApi.put(
    "/profile/password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};