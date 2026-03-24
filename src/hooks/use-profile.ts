"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

import {
  changePasswordAction,
  deleteProfileAction,
  updateProfileAction,
  updateProfilePhotoAction,
} from "@/features/profile/actions/profile.actions";

import type { ChangePasswordFields, ProfileUpdateFields } from "@/lib/schemes/profile.schema";
import type { Session } from "next-auth";

async function parseResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function refetchSessionUser(): Promise<Session["user"]> {
  const res = await fetch("/api/profile-data", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await parseResponse(res);
    const msg =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error?: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not refresh profile";
    throw new Error(msg);
  }

  const data = (await res.json()) as { user?: Session["user"] };
  if (!data?.user) {
    throw new Error("Invalid profile response");
  }
  return data.user;
}

export function useUpdateProfile() {
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formValues: ProfileUpdateFields) => {
      const toastId = toast.loading("Updating profile…");
      try {
        await updateProfileAction(formValues);
        toast.dismiss(toastId);
      } catch (e) {
        toast.dismiss(toastId);
        throw e;
      }
    },
    onSuccess: async () => {
      toast.success("Profile updated");
      try {
        const user = await refetchSessionUser();
        await update({
          user: {
            ...(session?.user ?? {}),
            ...user,
          },
        });
        await queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      } catch {
        await queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  return {
    ...mutation,
    currentUser: session?.user,
    status: session ? "authenticated" : "unauthenticated",
  };
}

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: async (formValues: ChangePasswordFields) => {
      const toastId = toast.loading("Changing password…");
      try {
        await changePasswordAction(formValues);
        toast.dismiss(toastId);
      } catch (e) {
        toast.dismiss(toastId);
        throw e;
      }
    },
    onSuccess: () => {
      toast.success("Password changed");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to change password");
    },
  });

  return mutation;
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const toastId = toast.loading("Deleting account…");
      try {
        await deleteProfileAction();
        toast.dismiss(toastId);
      } catch (e) {
        toast.dismiss(toastId);
        throw e;
      }
    },
    onSuccess: async () => {
      toast.success("Account deleted");
      await queryClient.clear();
      await signOut({ redirect: false });
      window.location.href = "/login";
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete account");
    },
  });
}

export function useUpdateProfilePhoto() {
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const toastId = toast.loading("Uploading photo…");
      try {
        const formData = new FormData();
        formData.append("photo", file);
        await updateProfilePhotoAction(formData);
        toast.dismiss(toastId);
      } catch (e) {
        toast.dismiss(toastId);
        throw e;
      }
    },
    onSuccess: async () => {
      toast.success("Photo updated");
      try {
        const user = await refetchSessionUser();
        await update({
          user: {
            ...(session?.user ?? {}),
            ...user,
          },
        });
        await queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      } catch {
        await queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to upload photo");
    },
  });
}

export const useUpdateProfileMutation = useUpdateProfile;
export const useChangePasswordMutation = useChangePassword;
export const useDeleteAccountMutation = useDeleteProfile;
export const useUploadProfilePhotoMutation = useUpdateProfilePhoto;
