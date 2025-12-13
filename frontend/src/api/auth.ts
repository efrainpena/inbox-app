import api from "./client";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/login", { email, password });
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/user");
  return data;
}
