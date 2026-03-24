"use server";

import { getAuthHeaders, getEditProfileUrl } from "@/lib/services/profile.api";
import { UpdateProfileFields } from "@/lib/types/auth";
import { UpdateProfileResponse } from "@/lib/types/auth.type";
import getToken from "@/lib/utils/manage-token";

export async function updateUserProfileAction(
  data: UpdateProfileFields,
): Promise<ApiResponse<UpdateProfileResponse>> {
  const token = await getToken();
  const accessToken = token?.accessToken;

  if (!accessToken || typeof accessToken !== "string") {
    return { error: "Not authenticated" } as ApiResponse<UpdateProfileResponse>;
  }

  const response = await fetch(getEditProfileUrl(), {
    method: "PUT",
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify(data),
    cache: "no-store",
    credentials: "omit",
  });

  return response.json();
}
