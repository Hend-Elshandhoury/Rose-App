import RevenueChart from "./_components/revenue-chart";
import { orderStatus } from "./_services/order-status.service";
import OrdersStatusChart from "./_components/orders-status-chart";

export default async function Page() {
    // fetch orders by status and monthly revenue
    const orders = await orderStatus();

    // extract data for charts
    const ordersByStatus = orders?.statistics?.ordersByStatus;

    const monthlyRevenue = orders?.statistics?.monthlyRevenue;

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* first row => total & all categories */}

            {/* second row=> order & revenue */}
            <div className="grid grid-cols-4 gap-6">
                <div className="classes col-span-4 lg:col-span-1"> <OrdersStatusChart data={ordersByStatus} /></div>
                <div className="classes col-span-4 lg:col-span-3"><RevenueChart data={monthlyRevenue} /></div>
            </div>
            {/* third row=> selling & low stock */}

        </div>
    )
}
