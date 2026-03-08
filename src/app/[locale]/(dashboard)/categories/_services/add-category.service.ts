import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

interface AddCategoryPayload {
    name: string;
    image?: string;
}
const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL!}/categories`;

export async function addCategoryService(data: AddCategoryPayload) {


    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_AUTH_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });
    console.log("Response:", response, session?.accessToken);
    if (!response.ok) {
        const error = await response.text();
        console.log("API ERROR:", error);
        throw new Error(error);
    }

    return response.json();
}