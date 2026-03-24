import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import DashboardProvider from "@/components/providers/dashboard/dashboard.provider";
import { Breadcrumbs } from "@/components/layout/dashboard/bread-crumbs";
import { DashboardMobileNav } from "@/components/layout/dashboard/dashboard-mobile-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/tailwind-merge";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <AppSidebar />

      {/* Use div (not SidebarInset/main) — root layout already wraps routes in <main> */}
      <div
        className={cn(
          "relative flex min-h-svh w-full min-w-0 flex-1 flex-col bg-zinc-50 dark:bg-zinc-800",
        )}
      >
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-zinc-200/80 bg-white/95 px-3 py-3 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95 sm:px-4 md:px-6 lg:px-8">
          <SidebarTrigger className="h-9 w-9 shrink-0 md:h-8 md:w-8" />
          <div className="min-w-0 flex-1 overflow-x-auto">
            <Breadcrumbs />
          </div>
        </header>

        {/* Bottom padding on small screens for fixed tab bar */}
        <div className="flex-1 px-3 pb-8 sm:px-4 ">
          {children}
        </div>

        <DashboardMobileNav />
      </div>
    </DashboardProvider>
  );
}
