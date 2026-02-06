"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  defaultValue,
  LoginSchemaType,
} from "@/lib/schemes/login.schema";
import { toast } from "sonner";
import { sessionToken } from "@/lib/utils/session-token";

export function useLoginHook() {
  // navigation
  const router = useRouter();

  // hook
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultValue,
  });

  // handle submit
  const onSubmit = async (data: LoginSchemaType) => {
    const { email, password, remember } = data;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        toast.error(response?.error);
        return;
      }

      // 2️⃣ If remember = false → move session to sessionStorage
      if (!remember) {
        // Wait for session to be created
        await new Promise((resolve) => setTimeout(resolve, 500));

        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (!session?.accessToken) {
          throw new Error("Access token not found");
        }

        // Store token in sessionStorage
        sessionToken.set(session.accessToken);

        // Delete NextAuth cookies
        await signOut({ redirect: false });
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return {
    form,
    onSubmit,
  };
}
