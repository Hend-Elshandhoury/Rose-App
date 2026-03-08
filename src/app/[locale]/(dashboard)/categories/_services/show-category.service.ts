import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/categories`;

export async function showCategoryService(id: string) {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to show category");
    }

    return response.json();
}