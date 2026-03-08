
import { getServerSession } from "next-auth";
import Forbidden from "../../forbidden";
import { Suspense } from "react";
import AllCategoriesStatsSkeleton from "@/components/skeletons/categories-stats.sekelton";
import StatisticsCardSkeleton from "@/components/skeletons/statistics-card.skeleton";
import AllCategoriesStats from "./_components/all-categories-stats";
import AllStatsCard from "./_components/all-statistics/all-stats-card";
import RevenueChart from "./_components/revenue-chart";
import { orderStatus } from "./_services/order-status.service";
import OrdersStatusChart from "./_components/orders-status-chart";
    
export default async function Page() {
  
    // fetch orders by status and monthly revenue
    const orders = await orderStatus();

    // extract data for charts
    const ordersByStatus = orders?.statistics?.ordersByStatus;

    const monthlyRevenue = orders?.statistics?.monthlyRevenue;
  
  const session = await getServerSession();
  if (!session) {
    return Forbidden();
  }

  return (
    <>
      {/* First Section Statstics */}

      <div className="md:flex gap-6 pt-6  mb-5">
        {/* statstics card for all items */}
        <Suspense fallback={<StatisticsCardSkeleton />}>
          <AllStatsCard />
        </Suspense>
        {/* statstics card for all categories */}
        <Suspense fallback={<AllCategoriesStatsSkeleton />}>
          <AllCategoriesStats />
        </Suspense>
      </div>
      
          {/* second row=> order & revenue */}
            <div className="grid grid-cols-4 gap-6">
                <div className="classes col-span-4 lg:col-span-1"> <OrdersStatusChart data={ordersByStatus} /></div>
                <div className="classes col-span-4 lg:col-span-3"><RevenueChart data={monthlyRevenue} /></div>
            </div>
    </>
  );
}
