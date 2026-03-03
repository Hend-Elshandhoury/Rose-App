import { fetchOccasions } from "@/app/[locale]/(site)/(homepage)/_services/fetch-occasions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const data = await fetchOccasions({ page, limit });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return NextResponse.json(
      { error: "Failed to fetch occasions" },
      { status: 500 },
    );
  }
}
