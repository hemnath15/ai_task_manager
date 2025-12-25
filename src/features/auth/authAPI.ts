import api from "../../services/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
}

export const loginAPI = (data: LoginPayload) =>
  api.post("/auth/login", data);

export const signupAPI = (data: SignupPayload) =>
  api.post("/auth/signup", data);
