import { NextIntlClientProvider } from "next-intl";
import NextAuthProvider from "./session-provider";
import { LayoutProps } from "@/lib/types/layout.types";

export function Providers({ children, session }: LayoutProps) {
  return (
    <>
      {/* Providers */}
      <NextIntlClientProvider>
      <NextAuthProvider session={session}>
          {children}
        </NextAuthProvider>
      </NextIntlClientProvider>
    </>
  );
}
