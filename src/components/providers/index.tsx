import { NextIntlClientProvider } from "next-intl";
import NextAuthProvider from "./shared/components/next-auth.provider";
import AuthChecker from "./auth-checker"

type LayoutProps = {
  children: React.ReactNode;
};

export function Providers({ children }: LayoutProps) {
  return (
    <>
      {/* Providers */}
      <NextAuthProvider>
        <AuthChecker/>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </NextAuthProvider>
    </>
  );
}
