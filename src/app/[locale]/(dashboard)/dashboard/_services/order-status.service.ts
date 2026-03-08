'use server'

import getToken from "@/lib/utils/manage-token";

// fetch all orders 
export async function orderStatus() {
  // get token 
  const session = await getToken();

  const accessToken = session?.accessToken;

  if (!accessToken) {
    console.error("Auth Failure: Token exists but accessToken is missing.");
    return { success: false, error: "Unauthorized" };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/statistics/orders`, {
      cache: "no-store",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
      },
    }
    );

    // Session expired
    if (!response.ok) {
      if (response.status === 401) throw new Error("Session expired");
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Orders Service Error:", error);
    return { success: false, error: error };
  }

}
