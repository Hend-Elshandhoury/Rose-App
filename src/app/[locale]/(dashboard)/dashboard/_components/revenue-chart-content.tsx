"use client";

import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { useLocale } from "next-intl";
import { OrderStatus } from "@/lib/types";
import CustomTooltip from "./custom-tooltip";
import { formatXAxis } from "@/lib/constants";
import { CardContent } from "@/components/ui/card";

export default function RevenueChartContent({ data }: { data: OrderStatus[] }) {
    // direction
    const isRTL = useLocale() === "ar";

    // sort data by date ascending
    const sortedData = [...data].sort((a, b) => new Date(a._id).getTime() - new Date(b._id).getTime());

    return (
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                {/* area chart */}
                <AreaChart
                    data={sortedData}
                    margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        {/* linear Gradient */}
                        <linearGradient id="_id" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#A6252A" stopOpacity={0.5} />
                            <stop offset="80%" stopColor="#F8B1EF" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    {/* remove horizontal line */}
                    <CartesianGrid vertical={true} horizontal={false} stroke="#F1F5F9" />
                    {/* X axis */}
                    <XAxis
                        dataKey="_id"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "##27272a", fontWeight: 500 }}
                        // dy={10}
                        tickFormatter={formatXAxis}
                    />
                    {/* Y axis */}
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "##27272a", fontWeight: 500 }}
                        orientation="left"
                        // width={80}
                        dx={isRTL ? -60 : 0}
                    />
                    {/* Tooltip */}
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: '#F1F5F9', opacity: 0.5 }}
                        isAnimationActive={false}
                        allowEscapeViewBox={{ x: true, y: true }}
                    />
                    {/* Area */}
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#A6252A"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#_id)"
                        isAnimationActive
                        animationDuration={800}
                        activeDot={{ r: 4, fill: "#A6252A", stroke: "white", strokeWidth: 2 }}
                    />

                </AreaChart>
            </ResponsiveContainer>
        </CardContent>
    );
}