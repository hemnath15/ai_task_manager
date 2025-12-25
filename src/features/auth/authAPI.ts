import api from "../../services/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
}
// for prod
export const loginAPI = (data: LoginPayload) =>
  api.post("api/auth/login", data);

export const signupAPI = (data: SignupPayload) =>
  api.post("api/auth/register", data);
