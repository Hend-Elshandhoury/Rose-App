"use client";

import { OrderStatus } from "@/lib/types";
import CardHeaderChart from "./card-header";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import RevenueChartContent from "./revenue-chart-content";

export default function RevenueChart({ data }: { data: OrderStatus[] }) {
  // TRANSLATE
  const t = useTranslations("order");

  return (
    <Card className="shadow-none">
      {/* card header */}
      <CardHeaderChart t={t} />
      {/* card content */}
      <RevenueChartContent data={data} />
    </Card>
  );
}