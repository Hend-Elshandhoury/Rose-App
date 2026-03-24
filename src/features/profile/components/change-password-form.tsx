"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";

import { useChangePasswordMutation } from "@/hooks/use-profile";

import {
  changePasswordSchema,
  type ChangePasswordFields,
} from "@/lib/schemes/profile.schema";

export function ChangePasswordForm() {
  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isSubmitting = changePasswordMutation.isPending;
  const isDirty = form.formState.isDirty;

  function onSubmit(values: ChangePasswordFields) {
    changePasswordMutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className="mx-auto w-full px-10 ">
      <h1 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:mb-6 sm:text-2xl md:text-3xl">
        Change Password
      </h1>

      <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-6 md:rounded-3xl md:p-8 md:shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="gap-1.5 border-b border-zinc-200 pb-4 dark:border-zinc-700 sm:pb-5">
                  <FormLabel className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Old Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="Old Password"
                      status={
                        form.formState.errors.currentPassword
                          ? "error"
                          : "default"
                      }
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <FormLabel className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    New Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="New Password"
                      status={
                        form.formState.errors.newPassword
                          ? "error"
                          : "default"
                      }
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="gap-1.5">
                  <FormLabel className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Confirm New Password
                  </FormLabel>

                  <FormControl>
                    <InputPassword
                      placeholder="Confirm New Password"
                      status={
                        form.formState.errors.confirmNewPassword
                          ? "error"
                          : "default"
                      }
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2 sm:pt-4">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={!isDirty || isSubmitting}
                className="h-12 w-full rounded-xl text-base font-semibold sm:h-11"
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}