import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";


const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/categories`;

export async function updateCategoryService(
    id: string,
    formData: FormData
) {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
        cache: "no-store",
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update category");
    }

    return response.json();
}