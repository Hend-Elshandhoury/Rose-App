"use client";

import { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PhoneInput } from "@/components/ui/phone-input";

import {
  useUpdateProfileMutation,
  useUploadProfilePhotoMutation,
} from "@/hooks/use-profile";

import {
  profileUpdateSchema,
  type ProfileUpdateFields,
} from "@/lib/schemes/profile.schema";

import type { ProfileUser } from "@/lib/types/profile";

import { toast } from "sonner";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { Link } from "@/i18n/navigation";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

interface AccountSettingsFormProps {
  user: ProfileUser;
}

const GENDER_OPTIONS: {
  value: ProfileUpdateFields["gender"];
  label: string;
}[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const updateMutation = useUpdateProfileMutation();
  const uploadPhotoMutation = useUploadProfilePhotoMutation();

  const form = useForm<ProfileUpdateFields>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      gender: user.gender ?? "other",
    },
  });

  const isDirty = form.formState.isDirty;
  const isSubmitting = updateMutation.isPending;

  function onSubmit(values: ProfileUpdateFields) {
    updateMutation.mutate(values);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please choose a .jpg, .png, or .gif image.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }
    uploadPhotoMutation.mutate(file);
    e.target.value = "";
  }

  /** unified user image */
  const userImageSrc = user.photo?.startsWith("http")
    ? user.photo
    : `${process.env.NEXT_PUBLIC_IMAGE_API_URL ?? ""}/${user.photo}`;

  return (
    <div className="mx-auto w-full px-6 ">
      <h1 className="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:mb-6 sm:text-2xl md:text-3xl">
        Account Settings
      </h1>

      <div className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900 sm:p-6 md:p-8 md:shadow-lg">
        {/* Profile Photo */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="relative mx-auto h-20 w-20 shrink-0 sm:mx-0 sm:h-[4.5rem] sm:w-[4.5rem] md:h-[4.75rem] md:w-[4.75rem]">
            {/* Profile Image */}
            <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              {user.photo ? (
                <Image
                  src={userImageSrc}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  {user.firstName?.[0] ?? "?"}
                </div>
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={photoInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              className="hidden"
              onChange={handlePhotoChange}
            />

            {/* Upload Icon Button */}
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              disabled={uploadPhotoMutation.isPending}
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              aria-label="Upload photo"
            >
              <CloudUpload className="h-4 w-4 text-zinc-700 dark:text-zinc-200" />
            </button>
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-start">
            <p className="font-semibold text-zinc-900 dark:text-zinc-300">
              Upload Photo
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-sm">
              You can upload a .jpg, .png, or .gif photo with max size of 5MB.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 sm:gap-5 md:gap-6"
          >
            {/* First / Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        className="h-11 rounded-lg border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        className="h-11 rounded-lg border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="h-11 rounded-lg border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="EG"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full min-w-0 [&_input]:h-11 [&_input]:rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-lg border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/50">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {GENDER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer — design: row of links, then full-width save on mobile */}
            <div className="mt-6 flex sm:flex-col md:flex-row justify-between gap-4 sm:mt-8">
              <div className="flex flex-row items-center gap-3">
                <DeleteAccountDialog />
                <Link
                  href="/dashboard/account/change-password"
                  className="shrink-0 text-sm font-medium text-zinc-800 transition-colors hover:text-maroon-700 dark:text-zinc-50 dark:hover:text-softPink-200"
                >
                  Change Password
                </Link>
              </div>

              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                variant="primary"
                loading={isSubmitting}
                className="h-12 w-fit md:w-fit rounded-xl px-6 text-base font-semibold sm:h-11"
                aria-disabled={!isDirty || isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
