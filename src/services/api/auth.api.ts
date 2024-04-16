import { IUser } from "@/types";
import instance from "./axios";

type RegisterType = {
  name?: string;
  email?: string;
  password?: string;
};

type LoginType = {
  email?: string;
  password?: string;
};

const login = (data: LoginType) => {
  return instance.post<IUser>("/auth/login", data);
};

const register = (data: RegisterType) => {
  return instance.post("/auth/create", data);
};

export const AuthApi = {
  login,
  register,
};
