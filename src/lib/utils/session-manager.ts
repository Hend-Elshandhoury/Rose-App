const SESSION_TYPE_KEY = "auth_session_type";

export type SessionType = "persistent" | "temporary";

export const sessionManager = {
  /**
   * Set session persistence type
   * @param type - "persistent" for Remember Me, "temporary" for session-only
   */
  setSessionType: (type: SessionType): void => {
    if (type === "persistent") {
      localStorage.setItem(SESSION_TYPE_KEY, "persistent");
    } else {
      sessionStorage.setItem(SESSION_TYPE_KEY, "temporary");
      // Ensure no persistent flag exists
      localStorage.removeItem(SESSION_TYPE_KEY);
    }
  },

  /**
   * Get current session type
   * Returns null if no valid session exists
   */
  getSessionType: (): SessionType | null => {
    // Check persistent session (localStorage survives browser close)
    if (localStorage.getItem(SESSION_TYPE_KEY) === "persistent") {
      return "persistent";
    }

    // Check temporary session (sessionStorage clears on tab/browser close)
    if (sessionStorage.getItem(SESSION_TYPE_KEY) === "temporary") {
      return "temporary";
    }

    return null;
  },

  /**
   * Clear all session data
   */
  clearSession: (): void => {
    localStorage.removeItem(SESSION_TYPE_KEY);
    sessionStorage.removeItem(SESSION_TYPE_KEY);
  },

  /**
   * Check if a valid session exists
   */
  isSessionValid: (): boolean => {
    return sessionManager.getSessionType() !== null;
  },
};