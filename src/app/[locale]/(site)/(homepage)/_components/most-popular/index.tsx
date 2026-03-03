import React, { Suspense } from "react";
import MostPopularHeader from "./most-pop-header";
import MostPopularList from "./most-pop-list";
import ProductCardSkeleton from "@/components/skeletons/product-card.skeleton";
import { getAllOccasions } from "../../_services/get-all-occasions-server";

interface MostPopularIndexProps {
  searchParams?: { occasion?: string };
}

export default async function MostPopularIndex({
  searchParams,
}: MostPopularIndexProps) {
  const allOccasions = await getAllOccasions({ limit: 4 });
  console.log(allOccasions, "aa");

  return (
    <div className="my-36">
      <MostPopularHeader occasions={allOccasions.data!.occasions} />
      <Suspense fallback={<ProductCardSkeleton count={12} />}>
        <MostPopularList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
