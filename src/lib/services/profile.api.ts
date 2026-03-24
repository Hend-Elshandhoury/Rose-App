import { JSON_HEADER } from "@/lib/constants/api.constance";
import type {
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "@/lib/types/profile";

export { JSON_HEADER };

export function getServerApiBaseUrl(): string {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "";

  if (!raw) {
    throw new Error("Missing API URL");
  }

  return raw.replace(/\/+$/, "");
}

export function getAuthHeaders(accessToken: string): Record<string, string> {
  if (!accessToken?.trim()) {
    throw new Error("Missing token");
  }

  return {
    ...JSON_HEADER,
    Authorization: `Bearer ${accessToken}`,
  };
}

async function readResponseBody(res: Response) {
  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/**
 * ✅ EDIT PROFILE
 */
export async function editProfileApi(
  accessToken: string,
  payload: UpdateProfilePayload,
) {
  const baseUrl = getServerApiBaseUrl();

  const res = await fetch(`${baseUrl}/auth/editProfile`, {
    method: "PUT",
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify(payload),
  });

  console.log("EDIT PROFILE STATUS:", res.status);

  if (res.status === 200 || res.status === 204) {
    return { success: true };
  }

  const data = await readResponseBody(res);

  throw new Error((data as any)?.message || "Failed to update profile");
}

/**
 * CHANGE PASSWORD
 */
export async function changePasswordApi(
  accessToken: string,
  payload: ChangePasswordPayload,
) {
  const baseUrl = getServerApiBaseUrl();

  const res = await fetch(`${baseUrl}/auth/change-password`, {
    method: "PUT",
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify({
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    }),
  });

  console.log("CHANGE PASSWORD STATUS:", res.status);

  if (res.status === 200 || res.status === 204) {
    return { success: true };
  }

  const data = await readResponseBody(res);

  throw new Error((data as any)?.message || "Failed to change password");
}

/**
 * ✅ DELETE ACCOUNT
 */
export async function deleteAccountApi(accessToken: string) {
  const baseUrl = getServerApiBaseUrl();

  const res = await fetch(`${baseUrl}/auth/deleteMe`, {
    method: "DELETE",
    headers: getAuthHeaders(accessToken),
  });

  console.log("DELETE STATUS:", res.status);

  if (res.status === 200 || res.status === 204) {
    return { success: true };
  }

  const data = await readResponseBody(res);

  throw new Error((data as any)?.message || "Failed to delete account");
}
