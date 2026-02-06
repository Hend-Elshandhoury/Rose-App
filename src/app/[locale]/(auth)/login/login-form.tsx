"use client";

import { Controller } from "react-hook-form";
import { useLoginHook } from "@/app/[locale]/(auth)/login/_hooks/use-login";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
  // Hook
  const { form, onSubmit } = useLoginHook();
  const t = useTranslations("auth.login");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* email */}
      <div>
        <Label>{t("Email")}</Label>

        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input {...field} placeholder="user@example.com" />
          )}
        />
        <p className="text-red-600 text-sm mt-1">
          {form.formState.errors.email?.message}
        </p>
      </div>

      {/* password */}
      <div className="">
        <div>
          <Label>{t("Password")}</Label>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Input {...field} type="password" placeholder="••••••••" />
            )}
          />

          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.password?.message}
          </p>
        </div>

        <Link
          href="/forgot-password"
          className="mt-2 flex justify-end text-maroon-700 text-sm font-semibold"
        >
          {t("forgot_password")}
        </Link>
      </div>

      {/* remember me */}
      <div className="flex items-center gap-2 mb-5">
        <Controller
          name="remember"
          control={form.control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label>{t("remember")}</Label>
      </div>

      <Button type="submit">{t("Login")}</Button>
    </form>
  );
}
