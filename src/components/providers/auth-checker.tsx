"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { sessionToken } from "@/lib/utils/session-token";

export default function AuthChecker() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;

    // Remove locale from pathname for comparison
    const segments = pathname.split("/");
    const locales = ["en", "ar"]; // Add your locales
    const locale = locales.includes(segments[1]) ? segments[1] : "en";
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];

    // Don't check on public routes
    if (publicRoutes.includes(pathnameWithoutLocale)) return;

    // Wait for NextAuth to finish loading
    if (status === "loading") return;

    // Check both NextAuth and sessionStorage
    const hasNextAuth = status === "authenticated";
    const hasSessionStorage = !!sessionToken.get();

    console.log("🔍 Auth Check:", {
      pathname: pathnameWithoutLocale,
      hasNextAuth,
      hasSessionStorage,
    });

    if (!hasNextAuth && !hasSessionStorage) {
      router.push(`/${locale}/login`);
    } else {
      hasChecked.current = true;
    }
  }, [status, pathname, router]);

  return null;
}
