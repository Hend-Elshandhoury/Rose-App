"use client";

import { OrderStatus } from "@/lib/types";
import { useTranslations } from "next-intl";
import RenderCustomLabel from "./render-custom-label";
import FilterDataOrderStatus from "./filter-data-order-status";
import { ALLOWED_STATUSES, STATUS_COLORS } from "@/lib/constants";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function OrdersStatusChart({ data }: { data: OrderStatus[] }) {
    // TRANSLATE
    const t = useTranslations("order");

  // FILTER DATA
  const filteredData = data.filter((item) => ALLOWED_STATUSES.includes(item._id));

  // TOTAL 
  const totalCount = filteredData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="shadow-none">
      {/* header */}
      <CardHeader>
        <CardTitle className="text-2xl font-semibold lg:text-center mb-3.5">
          {t("order_status")}
        </CardTitle>
      </CardHeader>
      {/* content */}
      <CardContent className="flex lg:flex-col gap-4 justify-between items-center">
        <ResponsiveContainer width="80%" height={180} className="ml-0 lg:mx-auto">
          <PieChart>
            <Pie
              data={filteredData} // FILTERED DATA
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              stroke="none"
              dataKey="count"
              label={<RenderCustomLabel totalCount={totalCount} />}
              labelLine={false}
              animationDuration={800}
            >
              {filteredData.map((item, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[item._id]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* filtered data  */}
        <FilterDataOrderStatus data={filteredData} totalCount={totalCount} />
      </CardContent>
    </Card>
  );
}