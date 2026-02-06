const SESSION_TOKEN_KEY = "session_token";

export const sessionToken = {
  set(token: string) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    }
  },

  get() {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(SESSION_TOKEN_KEY);
    }
    return null;
  },

  clear() {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
  },
};
