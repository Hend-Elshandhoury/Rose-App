"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { JSON_HEADER } from "@/lib/constants/api.constance";
import {
  changePasswordSchema,
  profileUpdateSchema,
} from "@/lib/schemes/profile.schema";
import type { ChangePasswordFields, ProfileUpdateFields } from "@/lib/schemes/profile.schema";

function getApiBaseUrl(): string {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "";
  if (!raw) {
    throw new Error("Missing API_URL or NEXT_PUBLIC_API_URL");
  }
  return raw.replace(/\/+$/, "");
}

/**
 * Safe JSON parse for optional error bodies (success responses are often empty).
 */
async function parseResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function messageFromStatus(status: number, data: unknown): string {
  if (status === 401 || status === 403) {
    return "Session expired or unauthorized. Please sign in again.";
  }
  if (status === 404) return "Resource not found.";
  if (status === 422 || status === 400) {
    if (data && typeof data === "object" && "message" in data) {
      const m = (data as { message?: unknown }).message;
      if (typeof m === "string") return m;
    }
    return "Invalid request.";
  }
  return `Request failed (${status})`;
}

async function assertOkEmptyBody(res: Response, context: string): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.log(`[profile.actions] ${context}`, res.status);
  }

  if (res.status === 200 || res.status === 204) {
    return;
  }

  const data = await parseResponse(res);
  throw new Error(messageFromStatus(res.status, data));
}

type SessionWithToken = NonNullable<
  Awaited<ReturnType<typeof getServerSession>>
> & { accessToken?: string };

function requireSessionToken(
  session: Awaited<ReturnType<typeof getServerSession>>,
): string {
  const token = (session as SessionWithToken | null)?.accessToken;
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("You must be signed in.");
  }
  return token.trim();
}

export async function updateProfileAction(values: ProfileUpdateFields) {
  const session = await getServerSession(authOptions);
  const token = requireSessionToken(session);

  const parsed = profileUpdateSchema.safeParse(values);
  if (!parsed.success) {
    const msg = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean)
      .join(" ");
    throw new Error(msg || "Validation failed");
  }
  const res = await fetch(`${getApiBaseUrl()}/auth/editProfile`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
    credentials: "omit",
  });

  await assertOkEmptyBody(res, "updateProfile");
}

export async function changePasswordAction(values: ChangePasswordFields) {
  const session = await getServerSession(authOptions);
  const token = requireSessionToken(session);

  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) {
    const msg = Object.values(parsed.error.flatten().fieldErrors)
      .flat()
      .filter(Boolean)
      .join(" ");
    throw new Error(msg || "Validation failed");
  }
  const res = await fetch(`${getApiBaseUrl()}/auth/change-password`, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    }),
    cache: "no-store",
    credentials: "omit",
  });

  await assertOkEmptyBody(res, "changePassword");
}

export async function deleteProfileAction() {
  const session = await getServerSession(authOptions);
  const token = requireSessionToken(session);

  const res = await fetch(`${getApiBaseUrl()}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    credentials: "omit",
  });

  await assertOkEmptyBody(res, "deleteProfile");
}

export async function updateProfilePhotoAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  const token = requireSessionToken(session);

  const file = formData.get("photo");
  if (!file || !(file instanceof Blob) || file.size === 0) {
    throw new Error("No file provided");
  }

  const res = await fetch(`${getApiBaseUrl()}/user/profile/photo`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    cache: "no-store",
    credentials: "omit",
  });

  await assertOkEmptyBody(res, "updateProfilePhoto");
}

/** @deprecated use updateProfilePhotoAction */
export const uploadProfilePhotoAction = updateProfilePhotoAction;
