"use client";

import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { sessionManager } from "@/lib/utils/session-manager";
import { useRouter } from "next/navigation";

/**
 * Validates session persistence based on "Remember Me" choice
 * Automatically logs out users when their session type is invalid
 */
export default function SessionValidator() {
  const { status } = useSession();
  const router = useRouter();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    // Only validate for authenticated users
    if (status !== "authenticated") return;

    const validateAndLogout = async () => {
      // Prevent multiple simultaneous logout attempts
      if (isLoggingOut.current) return;

      const sessionType = sessionManager.getSessionType();

      // If no valid session type exists, user needs to login again
      if (!sessionType) {
        isLoggingOut.current = true;

        // Clear all session data
        sessionManager.clearSession();

        // Sign out from NextAuth
        await signOut({ redirect: false });

        // Redirect to login
        router.replace("/login");
      }
    };

    // Validate on mount (catches browser/tab reopens)
    validateAndLogout();

    // Validate when tab becomes visible (user switches back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        validateAndLogout();
      }
    };

    // Validate when window gains focus
    const handleFocus = () => {
      validateAndLogout();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [status, router]);

  return null;
}
