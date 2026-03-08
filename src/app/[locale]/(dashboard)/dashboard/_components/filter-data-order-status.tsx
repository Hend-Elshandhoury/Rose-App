import { OrderStatus } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils/tailwind-merge";


export default function FilterDataOrderStatus({ data, totalCount }: { data: OrderStatus[], totalCount: number }) {

    return (
        <div className="lg:mt-6 w-full space-y-2">
            {data?.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className={cn("size-2.5 rounded-full", `bg-${STATUS_COLORS[item._id]}`)}
                        />
                        <span className="text-xs font-semibold capitalize">
                            {item._id}
                        </span>
                    </div>
                    <div className="text-xs font-bold flex gap-1">
                        <span>{item.count}</span>
                        <span className="font-semibold ">
                            ({((item.count / totalCount) * 100).toFixed(1)}%)
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}