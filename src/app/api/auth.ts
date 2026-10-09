// src/api/auth.ts
import Config from "react-native-config";


const API_URL = Config.API_URL;
export const LOGIN_URL = `${API_URL}/auth/login/`;


export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }

  return data;
}
