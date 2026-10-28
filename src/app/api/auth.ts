// src/api/auth.ts

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "EXPO_PUBLIC_API_URL is not configured. Check your .env file."
  );
}

export const LOGIN_URL = `${API_URL.replace(/\/$/, "")}/api/auth/login/`;

export type LoginResponse = {
  token: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    name: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
  };
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    });

    const responseText = await response.text();

    let data: any;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        `Invalid server response (HTTP ${response.status})`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.detail ||
          data.message ||
          data.error ||
          `Login failed (HTTP ${response.status})`
      );
    }

    // Django SimpleJWT returns "access", not "token".
    const token = data.access ?? data.token;
    const refresh = data.refresh ?? "";

    if (!token || !data.user) {
      console.error("Unexpected login response structure:", {
        hasAccess: !!data.access,
        hasToken: !!data.token,
        hasUser: !!data.user,
      });

      throw new Error(
        "Login response is missing the access token or user data."
      );
    }

    const user = data.user;

    return {
      token,
      refresh,
      user: {
        ...user,
        id: String(user.id),
        email: user.email,
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        name:
          [user.first_name, user.last_name]
            .filter(Boolean)
            .join(" ") || user.email,
        phone: user.phone ?? "",
        role: user.role ?? "",
      },
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error(
        "Login timed out. Check your internet connection and API server."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
