"use client";

import SessionValidator from "@/app/[locale]/(auth)/_components/session-validator";
import { LayoutProps } from "@/lib/types/layout.types";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children, session }: LayoutProps) {
  return (
    <SessionProvider session={session}>
      <SessionValidator />
      {children}
    </SessionProvider>
  );
}
